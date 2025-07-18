import React from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: number;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ 
  src, 
  alt, 
  name, 
  size = 50, 
  className = '' 
}) => {
  const [imageError, setImageError] = React.useState(false);
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRandomColor = (name: string) => {
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', 
      '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F',
      '#BB8FCE', '#85C1E9', '#F8C471', '#82E0AA'
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  if (src && !imageError) {
    return (
      <img
        src={src}
        alt={alt || `آواتار ${name}`}
        className={`rounded-circle ${className}`}
        style={{ 
          width: `${size}px`, 
          height: `${size}px`, 
          objectFit: 'cover' 
        }}
        onError={() => setImageError(true)}
      />
    );
  }

  return (
    <div
      className={`rounded-circle d-flex align-items-center justify-content-center text-white ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: name ? getRandomColor(name) : '#6c757d',
        fontSize: `${Math.max(12, size * 0.4)}px`,
        fontWeight: 'bold'
      }}
    >
      {name ? getInitials(name) : '👤'}
    </div>
  );
}; 