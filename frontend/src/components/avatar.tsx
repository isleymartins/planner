import React from 'react';

interface AvatarProps {
  user: string
}

const Avatar: React.FC<AvatarProps> = ({ user }) => {
  const getInitials = (user: string) => {
    const names = user.split(' ')
    const initials = names.map(n => n[0]).join('')
    return initials.toUpperCase()
  };

  return (
    <div className="px-5 py-5 flex items-center justify-center w-12 h-12 bg-zinc-400 text-white font-bold rounded-full">
      {getInitials(user)}
    </div>
  );
};

export default Avatar;
