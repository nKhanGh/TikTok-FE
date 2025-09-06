import classNames from 'classnames/bind';
import styles from './ProfileEdit.module.scss';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faCircleNotch,
  faClose,
  faPen,
  faWindowMinimize,
} from '@fortawesome/free-solid-svg-icons';
import { memo, useCallback, useEffect, useState } from 'react';
import useAxios from '../../../service/useAxios';
import useAvatar from '../../../hooks/useAvatar';
import ImageCrop from './ProfileEdit/ImageCrop';

const cx = classNames.bind(styles);

const AvatarInput = memo(
  ({ selectedFile, setSelectedFile, user, setIsCropping }) => {
    return (
      <div className={cx('edit-element')}>
        <div className={cx('edit-type')}>Profile Photo</div>
        <div className={cx('edit-info')}>
          <img
            src={
              selectedFile ? URL.createObjectURL(selectedFile) : user.avatarUrl
            }
            alt='avatar'
            className={cx('edit-avatar')}
          />
          <label className={cx('avatar-container')}>
            <input
              type='file'
              accept='image/*'
              className={cx('avatar-input')}
              onChange={(e) => {
                setSelectedFile(e.target.files[0]);
                setIsCropping(true);
              }}
            />
            <div className={cx('avatar-pen')}>
              <FontAwesomeIcon icon={faPen} />
            </div>
            <div className={cx('avatar-line')}>
              <FontAwesomeIcon icon={faWindowMinimize} />
            </div>
          </label>
        </div>
      </div>
    );
  },
);

const UsernameInput = memo(
  ({
    username,
    setUsername,
    isTrueUsername,
    setIsTrueUsername,
    isLoading,
    axiosInstance,
  }) => {
    const handleCheckUsername = useCallback(
      (e) => {
        const newUsername = e.target.value;
        setUsername(newUsername);

        const checkUsername = async () => {
          try {
            setIsTrueUsername(null); // reset
            const response = await axiosInstance.post(
              `/users/existed/${newUsername}`,
            );
            setIsTrueUsername(!response.data.result);
          } catch (error) {
            console.log(error);
          }
        };

        setTimeout(checkUsername, 500);
      },
      [axiosInstance, setUsername, setIsTrueUsername],
    );

    return (
      <div className={cx('edit-element')}>
        <div className={cx('edit-type')}>Username</div>
        <div className={cx('edit-info')}>
          <input
            type='text'
            className={cx('name-input')}
            value={username}
            onChange={handleCheckUsername}
          />
          <div className={cx('name-detail')} style={{ marginTop: '16px' }}>
            <div>http://localhost:5173/@{username}</div>
            <div>
              Usernames can only contain letters, numbers, underscores, and
              periods.
            </div>
          </div>
          {isTrueUsername && !isLoading && (
            <div className={cx('name-check')}>
              <FontAwesomeIcon icon={faCheck} />
            </div>
          )}
          {isLoading && (
            <div className={cx('name-loading')}>
              <FontAwesomeIcon icon={faCircleNotch} />
            </div>
          )}
        </div>
      </div>
    );
  },
);

const NameInput = memo(({ name, setName }) => (
  <div className={cx('edit-element')}>
    <div className={cx('edit-type')}>Name</div>
    <div className={cx('edit-info')}>
      <input
        type='text'
        className={cx('name-input')}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div className={cx('name-detail')}>
        Your nickname can only be changed once every 7 days.
      </div>
    </div>
  </div>
));

const BioInput = memo(({ bio, setBio }) => (
  <div className={cx('edit-element', 'border-none')}>
    <div className={cx('edit-type')}>Bio</div>
    <div className={cx('edit-info')}>
      <textarea
        type='text'
        className={cx('name-input')}
        value={bio}
        onChange={(e) => {
          const newBio = e.target.value;
          if (newBio.length <= 80) setBio(newBio);
        }}
        style={{ height: '100px' }}
      />
      <div className={cx('name-detail')}>{bio.length}/80</div>
    </div>
  </div>
));

const EditFooter = memo(({ canSave, isSaving, onCancel, onSave }) => (
  <div className={cx('edit-footer')}>
    <button className={cx('edit-cancel')} onClick={onCancel}>
      Cancel
    </button>
    <button className={cx('edit-save')} disabled={!canSave} onClick={onSave}>
      {isSaving ? (
        <div className={cx('save-loading')}>
          <FontAwesomeIcon icon={faCircleNotch} />
        </div>
      ) : (
        'Save'
      )}
    </button>
  </div>
));

const ProfileEdit = ({ setIsEditting, user, setUser }) => {
  const [isCropping, setIsCropping] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [username, setUsername] = useState(user.username);
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio);
  const [isTrueUsername, setIsTrueUsername] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading] = useState(false);
  const [canSave, setCanSave] = useState(false);
  const { updateAvatar } = useAvatar();

  const axiosInstance = useAxios();

  console.log(isCropping);

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (selectedFile) formData.append('avatarFile', selectedFile);
    formData.append('username', username);
    formData.append('name', name);
    formData.append('bio', bio);
    setIsSaving(true);
    console.log(selectedFile);
    try {
      const response = await axiosInstance.put(
        '/users/updatePublic',
        formData,
        { skipAuth: false },
      );
      const newUser = response.data.result;
      setIsSaving(false);
      setCanSave(false);
      setIsEditting(false);
      setUser(newUser);
      localStorage.setItem('tiktokUsername', newUser.username);
      updateAvatar(newUser.avatarUrl);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    const can =
      username !== user.username ||
      name !== user.name ||
      bio !== user.bio ||
      selectedFile;
    setCanSave(can);
  }, [username, name, bio, selectedFile]);
  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        {!isCropping ? (
          <>
            <div className={cx('header')}>
              <div>Edit profile</div>
              <button
                className={cx('header-button')}
                onClick={() => setIsEditting(false)}
              >
                <FontAwesomeIcon icon={faClose} />
              </button>
            </div>
            <div className={cx('edit-body')}>
              <AvatarInput
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
                user={user}
                setIsCropping={setIsCropping}
              />
              <UsernameInput
                username={username}
                setUsername={setUsername}
                isTrueUsername={isTrueUsername}
                setIsTrueUsername={setIsTrueUsername}
                isLoading={isLoading}
                axiosInstance={axiosInstance}
              />
              <NameInput name={name} setName={setName} />
              <BioInput bio={bio} setBio={setBio} />
            </div>
            <EditFooter
              canSave={canSave}
              isSaving={isSaving}
              onCancel={() => setIsEditting(false)}
              onSave={handleUpdateUser}
            />
          </>
        ) : (
          <ImageCrop
            setIsCropping={setIsCropping}
            setSelectedFile={setSelectedFile}
            selectedFile={selectedFile}
          />
        )}
      </div>
    </div>
  );
};

ProfileEdit.propTypes = {
  setIsEditting: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
};

AvatarInput.propTypes = {
  selectedFile: PropTypes.func.isRequired,
  setSelectedFile: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  setIsCropping: PropTypes.func.isRequired,
};

UsernameInput.propTypes = {
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  isTrueUsername: PropTypes.bool.isRequired,
  setIsTrueUsername: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  axiosInstance: PropTypes.node.isRequired,
};

NameInput.propTypes = {
  name: PropTypes.string.isRequired,
  setName: PropTypes.func.isRequired,
};

BioInput.propTypes = {
  bio: PropTypes.string.isRequired,
  setBio: PropTypes.func.isRequired,
};

EditFooter.propTypes = {
  canSave: PropTypes.bool.isRequired,
  isSaving: PropTypes.bool.isRequired,
  onCancel: PropTypes.bool.isRequired,
  onSave: PropTypes.bool.isRequired,
};

export default ProfileEdit;
