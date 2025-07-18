import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FamilyChat from '../../../components/families/FamilyChat';
import { ChatService } from '@/lib/services/chatService';
import { useAuth } from '@/hooks/useAuth';

jest.mock('@/lib/services/chatService');
jest.mock('@/hooks/useAuth');

describe('FamilyChat', () => {
  const MOCK_FAMILY_ID = 'fam1';
  const MOCK_USER_ID = 'user1';
  const MOCK_USER_FULL_NAME = 'Test User';

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({
      user: { id: MOCK_USER_ID, user_metadata: { full_name: MOCK_USER_FULL_NAME } },
    });
    (ChatService.getFamilyMessages as jest.Mock).mockResolvedValue([]);
    (ChatService.sendMessage as jest.Mock).mockResolvedValue({});
    (ChatService.subscribeToFamilyChat as jest.Mock).mockReturnValue({
      unsubscribe: jest.fn(),
    });
  });

  it('renders chat header', async () => {
    render(<FamilyChat familyId={MOCK_FAMILY_ID} />);
    expect(screen.getByText('Family Chat')).toBeInTheDocument();
  });

  it('fetches and displays initial messages', async () => {
    const mockMessages = [
      { id: 'msg1', family_id: MOCK_FAMILY_ID, sender_profile_id: 'user2', message: 'Hi there!', created_at: '2023-01-01T10:00:00Z', profiles: { full_name: 'Other User', avatar_url: '' } },
      { id: 'msg2', family_id: MOCK_FAMILY_ID, sender_profile_id: MOCK_USER_ID, message: 'Hello back!', created_at: '2023-01-01T10:01:00Z', profiles: { full_name: MOCK_USER_FULL_NAME, avatar_url: '' } },
    ];
    (ChatService.getFamilyMessages as jest.Mock).mockResolvedValue(mockMessages);

    render(<FamilyChat familyId={MOCK_FAMILY_ID} />);

    await waitFor(() => {
      expect(screen.getByText('Hi there!')).toBeInTheDocument();
      expect(screen.getByText('Hello back!')).toBeInTheDocument();
      expect(screen.getByText('Other User:')).toBeInTheDocument();
      expect(screen.getByText('Test User:')).toBeInTheDocument();
    });
  });

  it('sends a new message', async () => {
    render(<FamilyChat familyId={MOCK_FAMILY_ID} />);

    const messageInput = screen.getByPlaceholderText('Type your message...');
    const sendButton = screen.getByText('Send');

    fireEvent.change(messageInput, { target: { value: 'New test message' } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(ChatService.sendMessage).toHaveBeenCalledWith(MOCK_FAMILY_ID, MOCK_USER_ID, 'New test message');
      expect(messageInput).toHaveValue(''); // Input should be cleared
    });
  });

  it('subscribes to new messages and updates state', async () => {
    let mockCallback: (payload: any) => void;
    (ChatService.subscribeToFamilyChat as jest.Mock).mockImplementation((familyId, callback) => {
      mockCallback = callback;
      return { unsubscribe: jest.fn() };
    });

    render(<FamilyChat familyId={MOCK_FAMILY_ID} />);

    const newMessagePayload = { id: 'msg3', family_id: MOCK_FAMILY_ID, sender_profile_id: 'user3', message: 'New message from sub', created_at: '2023-01-01T10:02:00Z', profiles: { full_name: 'Subscriber', avatar_url: '' } };
    
    // Simulate a new message coming from the subscription
    if (mockCallback!) {
      mockCallback(newMessagePayload);
    }

    await waitFor(() => {
      expect(screen.getByText('New message from sub')).toBeInTheDocument();
      expect(screen.getByText('Subscriber:')).toBeInTheDocument();
    });
  });
});
