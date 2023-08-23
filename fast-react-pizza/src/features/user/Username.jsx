import { useSelector } from 'react-redux';

function Username() {
  // useSelector to access the state
  const username = useSelector((state) => state.user.username);
  
  if (!username) return null;
  
  return (
    <div className="hidden text-sm font-semibold md:block">{username}</div>
  );
}

export default Username;
