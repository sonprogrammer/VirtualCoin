const Transaction = require("../Models/transactionModel")
const Hold = require("../Models/holdingModel");





// *거래된내역 가져오기
const getTransactions = async(req, res) => {
    try {
        const userId = req.params.userId
        if(!userId){
            return res.status(404).json({message: 'userId not found'})
        }

        const transaction = await Transaction.findOne({userId})

        if(!transaction){
            return res.status(404).json({message: 'there is no transaction'})
        }
        return res.status(200).json(transaction)
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: 'internal server error'})
    }
}



module.exports = { getTransactions }