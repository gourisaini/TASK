import { createContext, useState } from 'react';

export const AccountContext = createContext(null);

const AccountProvider = ({ children }) => {
  const [user, setUser] = useState('');
  const [list, setList] = useState('');

  return (
    <AccountContext.Provider value={{ user, setUser, list, setList }}>
      {children}
    </AccountContext.Provider>

  )
}

export default AccountProvider;
