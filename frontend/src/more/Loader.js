import React from 'react';
import './Loader.css';

const Loading = () => {
    return (
        <div className="loading">
            <input type="checkbox" id='check' />
            <label htmlFor='check' className='load'>
                <div className="check-icon"></div>
            </label>
        </div>
    )
}

export default Loading;