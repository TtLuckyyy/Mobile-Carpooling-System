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
			startLoc: '',
			endLoc: '',
			startAt: new Date(),
			seats:null,
			orderID:null,
		},
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
	TOGGLE_EXCLUSIVE(state) {
	  state.rideRequest.exclusive = !state.rideRequest.exclusive
	},
	TOGGLE_HIGHWAY(state) {
	  state.rideRequest.highway = !state.rideRequest.highway
	},
	SET_REQUEST_ID(state, id) {
	  state.rideRequest.requestID = id
	},
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
		console.log("111",state.rideOrder.orderID);
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
	toggleExclusive({ commit }) {
	  commit('TOGGLE_EXCLUSIVE')
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
	}
  }
})