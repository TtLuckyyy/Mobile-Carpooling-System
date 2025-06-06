import { createStore } from 'vuex'

export default createStore({
  state() {
    return {
		userID: '1',
		rideRequest: {  // 拼车需求数据
	        startLoc: '华东理工大学',
	        endLoc: '上海财经大学',
	        startAt: new Date('2025-04-14 00:00:00'),
	        exclusive: false,
	        highway: false,
			requestID:null,
		},
		rideOrder: {  
			orderID:null,
			startLoc: '华东理工大学',
			endLoc: '上海财经大学',
			startAt: new Date('2025-04-14 00:00:00'),
		},
		rideInvitation:{
			startLoc: '华东理工大学',
			endLoc: '上海财经大学',
			startAt: new Date('2025-04-14 00:00:00'),
			seats:3,
			invitationID:null,
		},
		current_change_request_id:null,
    }
  },
  mutations: {
    MLOGIN(state, userID) {
      state.userID = userID
    },
    MLOGOUT(state) {
      state.userID = '未登录用户'
    },
	// RideRequest mutations
	SET_START_LOC(state, location) {
	  state.rideRequest.startLoc = location
	},
	SET_END_LOC(state, location) {
	  state.rideRequest.endLoc = location
	},
	SET_START_AT(state, datetime) {
	  state.rideRequest.startAt = datetime
	},
	SET_EXCLUSIVE(state,exclusive) {
	  state.rideRequest.exclusive = exclusive
	},
	SET_HIGHWAY(state,highway) {
	  state.rideRequest.highway = highway
	},
	TOGGLE_HIGHWAY(state) {
	  state.rideRequest.highway = !state.rideRequest.highway
	},
	SET_REQUEST_ID(state, id) {
	  state.rideRequest.requestID = id
	},
	SET_INVITATION_ID(state, id) {
	  state.rideInvitation.invitationID = id
	},
	SET_CURRENT_CHANGE_REQUEST_ID(state, id) {
	  state.current_change_request_id = id
	},
	RESET_REQUEST(state, id) {
	  state.rideRequest.requestID = id;
	  state.rideRequest.startLoc = null;
	  state.rideRequest.endLoc = null;
	  state.rideRequest.startAt = new Date();
	  state.rideRequest.exclusive = null;
	  state.rideRequest.highway = false;
	},
	// SET_START_LOC_CURRENT_OBJECT(state, objectnum) {
	//   state.startLoc_currentObject = objectnum
	// },
	// SET_END_LOC_CURRENT_OBJECT(state, objectnum) {
	//   state.endLoc_currentObject = objectnum
	// },
	// SET_START_AT_CURRENT_OBJECT(state, objectnum) {
	//   state.startAt_currentObject = objectnum
	// },
	// Optional: reset all rideRequest fields
	RESET_RIDE_REQUEST(state) {
	  state.rideRequest = {
		startLoc: '',
		endLoc: '',
		startAt: '',
		exclusive: false,
		highway: false,
		requestID: null
	  }
	},
	SET_ORDER_ID(state, id) {
	    state.rideOrder.orderID = id;
		// console.log("111",state.rideOrder.orderID);
	}
  },
  actions: {
    login({ commit }, userID) {
      commit('MLOGIN', userID)
    },
    logout({ commit }) {
      commit('MLOGOUT')
    },
	// RideRequest actions
	setStartLoc({ commit }, location) {
	  commit('SET_START_LOC', location)
	},
	setEndLoc({ commit }, location) {
	  commit('SET_END_LOC', location)
	},
	setStartAt({ commit }, datetime) {
	  commit('SET_START_AT', datetime)
	},
	setExclusive({ commit },exclusive) {
	  commit('SET_EXCLUSIVE',exclusive)
	},
	setHighway({ commit },highway) {
	  commit('SET_HIGHWAY',highway)
	},
	toggleHighway({ commit }) {
	  commit('TOGGLE_HIGHWAY')
	},
	setRequestId({ commit }, id) {
	  commit('SET_REQUEST_ID', id)
	},
	resetRideRequest({ commit }) {
	  commit('RESET_RIDE_REQUEST')
	},
	setOrderId({ commit }, id) {
	  commit('SET_ORDER_ID', id);
	},
	setInvitationId({ commit }, id) {
	  commit('SET_INVITATION_ID', id)
	},
	setCurrentChangeRequestId({ commit }, id) {
	  commit('SET_CURRENT_CHANGE_REQUEST_ID', id)
	},
	// setStartLocCurrentObject({ commit }, objectnum) {
	//   commit('SET_START_LOC_CURRENT_OBJECT', objectnum)
	// },
	// setEndLocCurrentObject({ commit }, objectnum) {
	//   commit('SET_END_LOC_CURRENT_OBJECT', objectnum)
	// },
	// setStartAtCurrentObject({ commit }, objectnum) {
	//   commit('SET_START_AT_CURRENT_OBJECT', objectnum)
	// },
	resetRequest({commit},id){
		commit('RESET_REQUEST', id)
	}
  }
})