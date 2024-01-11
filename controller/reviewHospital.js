const { Reviewhospital } = require("../model/reviewHospital");
const HOSPITAL = require("../model/hospital");

exports.addHospital = async function (req, res) {
    const { hospitalId } = req.params;

    try {
      const hospital = await HOSPITAL.findById(hospitalId);
  
      if (!hospital) {
        return res.status(404).json({ error: 'Hospital not found' });
      }
  
      const { username, rating, comment } = req.body;
      const newReview = new Reviewhospital({ username, rating, comment });
  
    
      await newReview.save();
      hospital.reviews.push(newReview);
      await hospital.save();
  
      res.status(201).json({ message: 'Review posted successfully', review: newReview });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.Hospitalgetting = async function (req, res) {
    const { hospitalId } = req.params;

    try {
      const hospital = await HOSPITAL.findById(hospitalId).populate('reviews');
  
      if (!hospital) {
        return res.status(404).json({ error: 'Hospital not found' });
      }
  
      const reviews = hospital.reviews.map(review => ({
        _id: review._id,
        user: review.user,
        rating: review.rating,
        comment: review.comment,
       
      }));
  
      res.status(200).json({ reviews });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};
