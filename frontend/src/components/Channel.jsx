import { Button } from 'react-bootstrap';

const Channel = ({ channel, handleClick, currentChannelId }) => {
  return (
    <li className='nav-item w-100'>
      <Button
        variant={currentChannelId === channel.id ? 'btn-secondary' : ''}
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
