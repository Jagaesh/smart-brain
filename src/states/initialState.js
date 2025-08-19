const getInitialState = () => ({
  input: '',
  imageUrl: '',
  boxes: [],
  pendingRegions: [],
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
