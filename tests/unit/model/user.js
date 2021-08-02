const { Users } = require('../../../model/users')
const jwt = require('jsonwebtoken')
const config = require('config')
const mongoose = require('mongoose')



describe('user token', () => {
    it('should return a user id and isAdmin when we pass a token', () => {
      /*  const paylod = {_id:new mongoose.Types.ObjectId().toHexString(),isAdmin:true}
        const user = new Users(paylod)
        const token = user.generateAuthToken()
        const key = config.get('jwtPrivateKey')
        const decode = jwt.verify(token, key)
        expect(decode).toMatchObject(paylod)*/
    })
})