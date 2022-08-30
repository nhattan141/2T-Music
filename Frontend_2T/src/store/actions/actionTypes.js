const actionTypes = Object.freeze({
    //app
    APP_START_UP_COMPLETE: 'APP_START_UP_COMPLETE',
    SET_CONTENT_OF_CONFIRM_MODAL: 'SET_CONTENT_OF_CONFIRM_MODAL',

    //user
    ADD_USER_SUCCESS: 'ADD_USER_SUCCESS',
    ADD_USER_FAIL: 'SAVE_USER_FAIL',

    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAIL: 'USER_LOGIN_FAIL',
    USER_SIGNUP_SUCCESS: 'USER_SIGNUP_SUCCESS',
    PROCESS_LOGOUT: 'PROCESS_LOGOUT',

    GET_ALL_USER_SUCCESS: 'GET_ALL_USER_SUCCESS',
    GET_ALL_USER_FAIL: 'GET_ALL_USER_FAIL',

    DELETE_USER_SUCCESS: 'DELETE_USER_SUCCESS',
    DELETE_USER_FAIL: 'DELETE_USER_FAIL',

    UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',
    UPDATE_USER_FAIL: 'UPDATE_USER_FAIL',

    UPDATE_USER_INFO_SUCCESS: 'UPDATE_USER_SUCCESS',
    UPDATE_USER_INFO_FAIL: 'UPDATE_USER_FAIL',

    GET_ALL_SONG_SUCCESS: 'GET_ALL_SONG_SUCCESS',
    GET_ALL_SONG_FAIL: 'GET_ALL_SONG_FAIL',

    ADD_SONG_SUCCESS: 'ADD_SONG_SUCCESS',
    ADD_SONG_FAIL: 'ADD_SONG_FAIL',

    DELETE_SONG_SUCCESS: 'DELETE_SONG_SUCCESS',
    DELETE_SONG_FAIL: 'DELETE_SONG_FAIL',

    UPDATE_SONG_SUCCESS: 'UPDATE_SONG_SUCCESS',
    UPDATE_SONG_FAIL: 'UPDATE_SONG_FAIL',

    //song

    GET_RECENT_SONGS_SUCCESS: 'GET_RECENT_SONGS_SUCCESS',
    GET_RECENT_SONGS_FAIL: 'GET_RECENT_SONGS_FAIL',
    GET_NEW_RELEASE_SONGS_SUCCESS: 'GET_NEW_RELEASE_SONGS_SUCCESS',
    GET_NEW_RELEASE_SONGS_FAIL: 'GET_NEW_RELEASE_SONGS_FAIL',
    GET_TOP3_SONGS_SUCCESS: 'GET_TOP3_SONGS_SUCCESS',
    GET_TOP3_SONGS_FAIL: 'GET_TOP3_SONGS_FAIL',

    //get song to play
    GET_PLAY_SONGS_SUCCESS: 'GET_PLAY_SONGS_SUCCESS',
    GET_PLAY_SONGS_FAIL: 'GET_PLAY_SONGS_FAIL',

    //favorite song
    GET_FAVORITE_SONGS_SUCCESS: 'GET_FAVORITE_SONGS_SUCCESS',
    GET_FAVORITE_SONGS_FAIL: 'GET_FAVORITE_SONGS_FAIL',
    ADD_FAVORITE_SONGS_SUCCESS: 'ADD_FAVORITE_SONGS_SUCCESS',
    ADD_FAVORITE_SONGS_FAIL: 'ADD_FAVORITE_SONGS_FAIL',

})

export default actionTypes;