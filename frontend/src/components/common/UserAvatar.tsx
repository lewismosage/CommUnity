import React from 'react';

interface UserAvatarProps {
    name: string;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ name, size = 'md', className = '' }) => {
    const initials = name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    const sizeClasses = {
        sm: 'w-8 h-8 text-sm',
        md: 'w-10 h-10 text-base',
        lg: 'w-12 h-12 text-lg'
    };

    return (
        <div className={`
            ${sizeClasses[size]}
            rounded-full bg-primary-600 text-white
            flex items-center justify-center font-medium
            ${className}
        `}>
            {initials}
        </div>
    );
};

export default UserAvatar; 