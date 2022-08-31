import { memo } from 'react';
import ProfileMin from '../../components/ProfileMin';
import SessionButtons from '../../components/SessionButtons';

interface Props {
  session: Record<string, unknown> & any
}

const RightSideNav = ({session}: Props)=>{
  return(
    <>
      {!session.jwt &&
          <SessionButtons />
      }
      {Boolean(session.jwt) &&
          <ProfileMin>
            {session?.username? session?.username[0] : undefined}
          </ProfileMin>
      }
    </>
  );
};

export default memo(RightSideNav);