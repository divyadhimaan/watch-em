'use client';

import React from 'react';
import { Flex, Text } from '@/once-ui/components';

interface LoaderProps {
  message?: string;
  size?: number; // size of dots
  color?: string; // dot color
}

const Loader: React.FC<LoaderProps> = ({
  message = '',
  size = 16,
  color = 'white', // Once UI default blue
}) => {
  const dotStyle = (delay: string) => ({
    width: size,
    height: size,
    backgroundColor: color,
    borderRadius: '50%',
    animation: `bounce 0.6s infinite`,
    animationDelay: delay,
  });

  return (
    <Flex align="center" paddingY="160" horizontal="center" vertical="center" className="min-h-screen">

    {/* <Flex direction="column" align="center" className="min-h-screen gap-m"> */}
      <Flex gap="s">
        <div style={dotStyle('0s')} />
        <div style={dotStyle('0.1s')} />
        <div style={dotStyle('0.2s')} />
      </Flex>
      <Text variant="body-strong-s" color="gray600">
        {message}
      </Text>

      <style jsx>{`
        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }
      `}</style>
    </Flex>
  );
};

export default Loader;
