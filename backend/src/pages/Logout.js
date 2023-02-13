import { removeUserSession } from '../Utils/Common';

function Logout(props) {
    removeUserSession();
    props.history.push('/login');

    return ('');
}

export default Logout;