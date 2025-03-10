const User =  require('../Models/userModel')


const createGuestUser = async (req, res) => {
    const generateGuestName = () => {
        const randomName = Math.floor(Math.random() *10000).toString().padStart(4,'0')
        return `VC_${randomName}`
    }

    try {
        let guestName = generateGuestName()

        let userExist = await User.findOne({name: guestName})
        while(userExist){
            guestName = generateGuestName()
            userExist = await User.findOne({name: guestName})
        }

        const newGuestUser = new User({
            name: guestName,
            isGuest: true,
            totalAssets: 10000000,
            availableBalance: 10000000,
        })

        await newGuestUser.save()

        res.status(201).json(newGuestUser)
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Internal server error'})
    }
}

// * 관심코인 토글

// *관심코인 가져오기


module.exports =  {createGuestUser}