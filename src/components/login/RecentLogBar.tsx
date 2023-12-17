import React from 'react';

const RecentLogBar = () => {
  const recentUsers = [
    { id: 1, image: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { id: 2, image: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { id: 3, image: 'https://randomuser.me/api/portraits/men/3.jpg' },
    { id: 4, image: 'https://randomuser.me/api/portraits/women/4.jpg' },
    { id: 5, image: 'https://randomuser.me/api/portraits/men/5.jpg' },
  ];

  return (
    <div className='flex flex-col justify-center items-center space-y-12'>
      <div className='flex space-x-2'>
        {recentUsers.map((user, index) => (
          <div
            key={index}
            className={`w-[120px] h-[120px] rounded-full overflow-hidden relative ${
              index === 0 ? '' : 'opacity-60 filter brightness-75'
            }`}
          >
            {index === 0 && (
              <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-40'></div>
            )}
            <img
              src={user.image}
              alt={`User ${index + 1}`}
              className='w-full h-full object-cover'
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentLogBar;
