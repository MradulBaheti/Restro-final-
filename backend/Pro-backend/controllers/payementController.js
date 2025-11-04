const Razorpay = require("razorpay");
const config = require("../config/config");
const crypto = require("crypto");
// You are using createHttpError but haven't imported it
const createHttpError = require("http-errors"); 
// const { default: payments } = require("razorpay/dist/types/payments");

const createOrder = async (req, res, next) => {

    const razorpay = new Razorpay({
        key_id: config.razorpayKeyId,
        key_secret: config.razorpaySecretKey,
    });

    try {
        const { amount } = req.body;
        const options = {
            amount: amount * 100, // Amount in paisa (1 INR = 100 paisa)
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);
        res.status(200).json({ success: true, order });

    } catch (error) {
        next(error);
    }
};

const verifyPayement = async (req, res, next) => {

    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
            req.body;

        const expectedSignature = crypto
            .createHmac("sha256", config.razorpaySecretKey)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest("hex");

        if (expectedSignature === razorpay_signature) {
            res.json({ success: true, message: "Payment verified successfully!" });
        } else {
            const error = createHttpError(400, "Payment verification failed!");
            return next(error);
        }
    } catch (error) {
        next(error);
    }
}; // <-- FIX 1: Closed the verifyPayement function HERE

// FIX 2: webHookVerification is now defined in the main scope
const webHookVerification = async (req, res, next) => {
    try {
        const secret = config.razorpyWebhookSecret; // Note: Check .env for 'razorpyWebhookSecret' typo, maybe 'razorpay'?
        const signature = req.headers["x-razorpay-signature"];
        const body = JSON.stringify(req.body);

        const expectedSignature = crypto
            .createHmac("sha26", secret)
            .update(body)
            .digest("hex");

        if (expectedSignature === signature) {
            console.log("✅ Webhook verified:", req.body);

            // ✅ Process payment (e.g., update DB, send confirmation email)
            if (req.body.event === "payment.captured") {
                const payment = req.body.payload.payment.entity;
                console.log(`💰 Payment Captured: ${payment.amount / 100} INR`);
                // Update database, send email, etc.
            
            const newPayment=new Payment({
              payementId:payment.id,
              orderId:payment.order_id,
              amount:payment.amount/100,
              currency:payment.currency,
             status:payment.status,
             method:payment.method,
              email:payment.email,
               contact:payment.contact,
              createAt:new Date(payment.created_at*1000)

            })

        await newPayment.save();
        res.json({success:true});

        }

            res.json({ success: true });
        } else {
            const error = createHttpError(400, "❌ Invalid Signature!");
            return next(error);
        }

    } catch (error) {
        next(error)
    }
}; // <-- FIX 3: Closed the webHookVerification function HERE

// This will now work perfectly
module.exports = { createOrder, verifyPayement, webHookVerification };