import express from 'express';
import {
  initSession,
  getSession,
  evaluateNegotiationTurn,
  getMerchantPolicy
} from '../services/negotiationEngine.js';
import { generateNegotiationDialogue } from '../services/aiService.js';

const router = express.Router();

// POST /api/negotiate/start - Initialize a new negotiation
router.post('/start', (req, res) => {
  try {
    const { plan, customerBudget, customerName, merchantId, productId } = req.body;
    const sessionId = `deal_sess_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

    const resolvedMerchantId = merchantId || plan?.merchantId || plan?.resolvedMerchant?.merchantId || 'merchant-omni';
    const policy = getMerchantPolicy(resolvedMerchantId);

    const session = initSession({
      sessionId,
      plan,
      customerBudget: customerBudget || plan?.totalPrice,
      customerName: customerName || 'Customer',
      merchantId: resolvedMerchantId,
      productId: productId || plan?.productId || plan?.id
    });

    // Return client-safe session initialization (ZERO internal margin/cost data)
    res.json({
      success: true,
      sessionId,
      merchantId: resolvedMerchantId,
      merchantName: policy.merchantName,
      maxRounds: policy.maxNegotiationRounds,
      session
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/negotiate/turn - Process a negotiation step
router.post('/turn', async (req, res) => {
  try {
    const {
      sessionId,
      customerOffer,
      customerMessage,
      selectedPlan,
      merchantId,
      productId,
      swapItemId,
      replacementItemId
    } = req.body;

    const evaluation = evaluateNegotiationTurn({
      sessionId,
      customerOffer,
      customerMessage,
      selectedPlan,
      merchantId,
      productId,
      swapItemId,
      replacementItemId
    });

    // Generate intelligent conversational pitch
    const aiMessage = await generateNegotiationDialogue({
      customerMessage: customerMessage || `Can I get this for ₹${customerOffer}?`,
      negotiationResult: evaluation,
      planTitle: selectedPlan ? (selectedPlan.resolvedProduct?.name || selectedPlan.title) : 'Deal Package',
      customerBudget: customerOffer,
      round: evaluation.round
    });

    res.json({
      success: true,
      data: {
        ...evaluation,
        aiMessage
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/negotiate/session/:sessionId - Retrieve session details
router.get('/session/:sessionId', (req, res) => {
  const session = getSession(req.params.sessionId);
  if (!session) {
    return res.status(404).json({ success: false, error: 'Session not found' });
  }
  res.json({ success: true, session });
});

export default router;
