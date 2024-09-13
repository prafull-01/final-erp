import React, { useContext } from 'react';
import AlertContext from '../contex/alert/alertcontext';

const Loader = () => {
    const context = useContext(AlertContext);
    const { isLoading } = context;
    return (
        <>
            {isLoading && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'white',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 9999,
                    }}
                >
                <b>
                 <p style={{ color: 'black', fontSize: '24px' }}>Loading...</p>
                 </b>
                </div>
            )}
        </>
    );
};

export default Loader;