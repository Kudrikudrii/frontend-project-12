import { Button } from 'react-bootstrap';
import { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import RemoveChannelModal from './modal/RemoveChannelModal';
import RenameChannelModal from './modal/RenameChannelModal';
import { useTranslation } from 'react-i18next';

const Channel = ({ channel, handleClick, currentChannelId, defaultChannelId }) => {
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const isActive = channel.id === currentChannelId;
  const isRemovable = channel.removable ? true : false;
  const { t } = useTranslation();

  return (
    <li className='nav-item w-100'>
      <div className="d-flex dropdown btn-group">
        <Button
          variant={isActive ? 'secondary' : ''}
          className='w-100 rounded-0 text-start btn'
          onClick={() => handleClick(channel.id)}
        >
          <span className='me-1'>#</span>
          {channel.name}
        </Button>

        {isRemovable && (
            <Dropdown>
              <Dropdown.Toggle
                split
                variant={isActive ? 'primary' : ''}
                className="flex-grow-0 rounded-0 dropdown-toggle dropdown-toggle-split btn"
              >
                <span className="visually-hidden">{t('chat.channelMenu.dropdownEl')}</span>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setShowRenameModal(true)}>
                  {t('chat.channelMenu.renameBtn')}
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setShowRemoveModal(true)}>
                  {t('chat.channelMenu.removeBtn')}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}

          <RenameChannelModal
            show={showRenameModal}
            onClose={() => setShowRenameModal(false)}
            channelId={channel.id}
            currentName={channel.name}
          />

          <RemoveChannelModal
            show={showRemoveModal}
            onClose={() => setShowRemoveModal(false)}
            channelId={channel.id}
            defaultChannelId={defaultChannelId}
            currentChannelId={currentChannelId}
            handleSwitchChannel={handleClick}
          />
      </div>      
    </li>
  );
};

export default Channel;
