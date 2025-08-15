import { Button } from 'react-bootstrap';

const Channel = ({ channel, handleClick, currentChannel }) => {
  return (
    <li className='nav-item w-100'>
      <Button
        variant={currentChannel === channel.id ? 'btn-secondary' : ''}
        className='w-100 rounded-0 text-start btn'
        onClick={() => handleClick(channel.id)}
      >
        <span className='me-1'>#</span>
        {channel.name}
      </Button>
    </li>
  );
};

export default Channel;
