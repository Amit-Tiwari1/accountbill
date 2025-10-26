// src/components/TokenCheckerWrapper.tsx
import React from 'react';
import { useTokenChecker } from '../hook/useTokenChecker';
import SessionExpiredModal from './SessionExpiredModal';

const TokenCheckerWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { sessionExpired } = useTokenChecker();

    return (
        <>
            {children}
            <SessionExpiredModal
                visible={sessionExpired}
                onDismiss={() => { }}
            />
        </>
    );
};

export default TokenCheckerWrapper;
