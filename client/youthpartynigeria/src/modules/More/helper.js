import { ChatNavigator } from '../Chat';
import { HomeNavigator } from '../Home'
import { ProfileNavigator } from '../Profile'
import { PostNavigator } from '../Post';

const __StackNavigator = (key) => {
  switch (key) {
    case 0:
    return HomeNavigator();

    case 1:
    return ChatNavigator();

    case 2:
    return PostNavigator();

    case 3:
    return ProfileNavigator();

    default:
    return null;
  }
}

export default __StackNavigator;
