import React from 'react';

interface IconProps {
    children: React.ReactNode;
    size: number;
    viewBox?: string;
}

const Icon = ({ size, children, viewBox }: IconProps) => (
    <svg width={size} height={size} viewBox={viewBox || '0 0 24 24'} fill="none" xmlns="http://www.w3.org/2000/svg">
        {children}
    </svg>
);

export default Icon;
