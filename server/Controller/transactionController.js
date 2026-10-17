const Transaction = require("../Models/transactionModel")
const Hold = require("../Models/holdingModel");





// *거래된내역 가져오기
const getTransactions = async(req, res) => {
    const userId = req.user?.id

    if(!userId){
        return res.status(401).json({message: 'login reqruired'})
    }
    
    try {

        const transaction = await Transaction.findOne({userId})

       
        return res.status(200).json({message: 'success', transaction})
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: 'internal server error'})
    }
}



module.exports = { getTransactions }