const {reviewmodel}=require("../model/reviewDoctor")


// reviewRouter.post('/review',addreviews);
// reviewRouter.get('/',reterivereviews);


exports.addreviews = async function(req,res){
    const { reviewerName, rating, comment } = req.body;


    if (!reviewerName || !rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'on the scale of 1 to 5 only' });
    }
  
    try {
      const newReview = new reviewmodel({
        reviewerName,
        rating,
        comment,
        date: Date.now(), 
      });
  
      const savedReview = await newReview.save();
      res.status(201).send("complete the review",savedReview);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    } 
}


exports.reterivereviews = async function(req,res){
    try {
        const reviews = await reviewmodel.find();
        res.status(200).json(reviews);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
}



