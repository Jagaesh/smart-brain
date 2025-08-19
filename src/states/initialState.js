const getInitialState = () => ({
  input: '',
  imageUrl: '',
  boxes: [],
  pendingData: null,
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
});

export default getInitialState
