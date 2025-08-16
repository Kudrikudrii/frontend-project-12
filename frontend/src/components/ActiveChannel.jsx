const ActiveChannel = ({ activeChannelData, channelMessages }) => {
    return (
      <div className='bg-light mb-4 p-3 shadow-sm small'>
        <p className='m-0'>
          <b># {activeChannelData.name}</b>
        </p>
        <span className='text-muted'>{`${channelMessages.length} сообщений`}</span>
      </div>
    )
};
       
export default ActiveChannel;