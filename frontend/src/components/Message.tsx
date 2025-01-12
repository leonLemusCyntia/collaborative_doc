import React, { PropsWithChildren } from 'react';
import { Alert } from 'react-bootstrap'

type AlertProps = { variant: string };

function Message( {children, variant }: PropsWithChildren<AlertProps> ) {
    return (
        <Alert variant={variant} >
            {children}
        </Alert>
    )
}

export default Message