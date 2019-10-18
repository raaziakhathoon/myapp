export default ({
    state: () => {
        const accessToken = sessionStorage.getItem('access_token');
        if (typeof accessToken !== 'undefined' && accessToken !== null && accessToken.length > 0) {
            return true;
        }
        return false;
    },
});
