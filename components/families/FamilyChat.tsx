import { useState, useEffect, useRef } from 'react';
import { ChatService, ChatMessage } from '@/lib/services/chatService';
import { useAuth } from '@/hooks/useAuth';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

interface FamilyChatProps {
  familyId: string;
}

export default function FamilyChat({ familyId }: FamilyChatProps) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const initialMessages = await ChatService.getFamilyMessages(familyId);
        setMessages(initialMessages);
      } catch (error) {
        console.error('Error fetching initial messages:', error);
      }
    };

    fetchMessages();

    const subscription = ChatService.subscribeToFamilyChat(familyId, (payload) => {
      // Ensure the payload includes profile data if needed for display
      setMessages(prev => [...prev, payload as ChatMessage]);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [familyId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '' || !user?.id) return;

    try {
      await ChatService.sendMessage(familyId, user.id, newMessage);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="card h-100 d-flex flex-column">
      <div className="card-header">Family Chat</div>
      <div className="card-body flex-grow-1 overflow-auto" style={{ maxHeight: '400px' }}>
        {messages.map((msg, index) => (
          <div key={msg.id || index} className={`d-flex mb-2 ${msg.sender_profile_id === user?.id ? 'justify-content-end' : 'justify-content-start'}`}>
            <div className={`p-2 rounded ${msg.sender_profile_id === user?.id ? 'bg-primary text-white' : 'bg-light'}`}>
              <strong>{msg.profiles?.full_name || msg.sender_profile_id}:</strong> {msg.message}
              <div className="text-end text-muted" style={{ fontSize: '0.75em' }}>{new Date(msg.created_at!).toLocaleTimeString()}</div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="card-footer">
        <form onSubmit={handleSendMessage} className="d-flex">
          <Input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="form-control me-2"
          />
          <Button type="submit" className="btn-primary">Send</Button>
        </form>
      </div>
    </div>
  );
}
