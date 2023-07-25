import hotel from "../model/hotel.js"; 

export const createHotel = async(req,res,next)=>{
    const newHotel = new hotel(req.body)
    try {
        const saveHotel = await newHotel.save()
        res.status(200).json(saveHotel)
    } catch (err) {
        next(err)
    }
}

export const updateHotel = async(req,res,next)=>{
    try {
        const updateHotel = await hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updateHotel)
    } catch (err) {
        next(err)
    }
}

export const deleteHotel = async(req,res,next)=>{
    try {
        await hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("Hotel has been deleted.")
    } catch (err) {
        next(err)
    }
}

export const getHotels = async(req,res,next)=>{
    try {
        const Hotels = await hotel.find()
        res.status(200).json(Hotels)
    } catch (err) {
        next(err)
    }
}

export const getIdHotel = async(req,res,next)=>{
    try {
        const Hotel = await hotel.findById(req.params.id)
        res.status(200).json(Hotel)
    } catch (err) {
        next(err)
    }
}

export const countByCity = async(req,res,next)=>{
    const cities = req.query.cities.split(",")
    try {
        const list = await Promise.all(cities.map(city=>{
            return hotel.countDocuments({city: city})
        }))
        res.status(200).json(list)
    } catch (err) {
        next(err)
    }
}

export const countByType = async(req,res,next)=>{
    
    try {
        const hotelCount = await hotel.countDocuments({type: "hotel"})
        const apartmentCount = await hotel.countDocuments({type: "apartment"})
        const resortCount = await hotel.countDocuments({type: "resort"})
        const villaCount = await hotel.countDocuments({type: "villa"})
        const cabinCount = await hotel.countDocuments({type: "cabin"})
        const motelCount = await hotel.countDocuments({type: "motel"})

        res.status(200).json([
            {type: "hotel", hotelCount},
            {type: "apartment", apartmentCount},
            {type: "resort", resortCount},
            {type: "villa", villaCount},
            {type: "cabin", cabinCount},
            {type: "motel", motelCount},
        ])
    } catch (err) {
        next(err)
    }
}