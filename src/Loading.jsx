import React from 'react';
import ReactLoading from 'react-loading';
 
const Loading = ({ type, color }) => (
    <div  className='loading'> 
    <ReactLoading type={'spin'} color={'#ccc'} height={'20%'} width={'20%'} />
    </div>
);
 
export default Loading;