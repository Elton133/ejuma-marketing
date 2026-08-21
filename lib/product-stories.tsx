import type { StoryFeature, StoryStat } from "@/components/ProductStoryPage";
import type { ReactNode } from "react";

export type ProductStory = {
  eyebrow: string;
  title: ReactNode;
  intro: string;
  audience: string;
  features: readonly StoryFeature[];
  stats: readonly StoryStat[];
  closingTitle: string;
  closingBody: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  heroImage?: string;
};

export const customerStory: ProductStory = {
  heroImage: "/landing3.png",
  eyebrow: "For customers",
  title: <>The right help.<br/><em className="not-italic text-[#FF5F15]">Right when you need it.</em></>,
  intro: "Discover trusted specialists, manage every detail of the job, and get the materials you need—all from one calm, connected experience.",
  audience: "Customer app",
  stats: [{ value: "Now", label: "Book immediately or schedule ahead" }, { value: "Live", label: "Status, location and communication" }, { value: "One", label: "Record from request to receipt" }, { value: "24/7", label: "Safety tools when they matter" }],
  features: [
    { eyebrow: "Discover", title: "Find skilled specialists nearby", description: "Search by service or area, compare verified profiles, portfolios, ratings, availability and distance before deciding who enters your home or workplace.", points: ["Map and list discovery", "Verified profiles", "Ratings and portfolios", "Favourite specialists"], visualLabel: "Nearby specialist discovery", image: "/images/products/customers/nearby-specialist-discovery.png" },
    { eyebrow: "Book & follow", title: "Know what is happening at every step", description: "Book now or schedule ahead, receive live status updates, communicate securely and keep changes attached to the original job.", points: ["Scheduled and immediate jobs", "Live booking status", "Chat and masked calls", "Scope-change approvals"], visualLabel: "Active booking detail", image: "/images/products/customers/active-booking-detail.png" },
    { eyebrow: "Complete with confidence", title: "A clear record after the work is done", description: "Review completion proof, keep receipts and service records, report issues and rate the experience without losing the history of what happened.", points: ["Before-and-after proof", "Receipts and reports", "Verified reviews", "Spotlight sharing controls"], visualLabel: "Completion and receipt", image: "/images/products/customers/completion-and-receipt1.png" },
    { eyebrow: "Everything around the job", title: "Services and supplies in one ecosystem", description: "Browse local shops, order products and materials, manage your cart and follow marketplace orders alongside the service that created the need.", points: ["Nearby shops", "Product search", "Cart and checkout", "Order tracking"], visualLabel: "Customer marketplace" },
  ],
  closingTitle: "A better way to get important work done.", closingBody: "Beagine brings discovery, trust, communication, safety and commerce into one thoughtfully designed customer journey.", primaryLabel: "Install customer app",
};

export const specialistStory: ProductStory = {
  heroImage: "/landing4.png",
  eyebrow: "For specialists",
  title: <>Your skill is the product.<br/><em className="not-italic text-[#FF5F15]">Build the business around it.</em></>,
  intro: "Receive nearby work, control how and when you operate, document professional results and grow a reputation that travels with you.",
  audience: "Specialist app",
  stats: [{ value: "Your", label: "Rates, schedule and service radius" }, { value: "Live", label: "Nearby requests while online" }, { value: "Proof", label: "Before-and-after job records" }, { value: "MoMo", label: "Straightforward payout requests" }],
  features: [
    { eyebrow: "Opportunity", title: "Jobs that find you", description: "Go online when you are ready, receive relevant nearby requests and review the location, schedule, earnings and site information before accepting.", points: ["Online availability", "Service radius", "Job request details", "Accept on your terms"], visualLabel: "Incoming job request", image: "/images/products/specialists/incoming-job-request.png" },
    { eyebrow: "Control", title: "Run work your way", description: "Set weekly hours and service prices, communicate with customers and manage every job state from arrival through completion.", points: ["Weekly availability", "Service-level pricing", "Job status management", "Secure communication"], visualLabel: "Specialist home and availability", image: "/images/products/specialists/specialist-home-and-availability.png" },
    { eyebrow: "Professional record", title: "Let completed work speak for you", description: "Upload before-and-after evidence, complete a clear checklist and turn verified milestones, reviews and performance into shareable Spotlight cards.", points: ["Completion proof", "Verified portfolio", "Customer reviews", "Shareable achievements"], visualLabel: "Completion proof", image: "/images/products/specialists/completion-proof.png" },
    { eyebrow: "Growth", title: "See the business behind the work", description: "Follow daily and long-term earnings, request payouts and strengthen a verified profile customers can trust before they make contact.", points: ["Earnings overview", "Payout history", "Verified professional profile", "Learning resources"], visualLabel: "Earnings and payouts" },
  ],
  closingTitle: "Built for a career, not just the next job.", closingBody: "Beagine helps skilled professionals turn visibility, reliable operations and strong work into lasting professional value.", primaryLabel: "Install specialist app", secondaryHref: "/ecosystem", secondaryLabel: "See the ecosystem",
};

export const vendorStory: ProductStory = {
  heroImage: "/landing2.png",
  eyebrow: "For vendors",
  title: <>Your shop,<br/><em className="not-italic text-[#FF5F15]">connected to real demand.</em></>,
  intro: "Bring your catalogue online, receive orders from nearby customers and professionals, and manage sales and payouts from a focused vendor workspace.",
  audience: "Vendor app",
  stats: [{ value: "One", label: "Digital shop and product catalogue" }, { value: "Local", label: "Demand from the service ecosystem" }, { value: "Clear", label: "Orders, sales and activity" }, { value: "MoMo", label: "Vendor withdrawal flow" }],
  features: [
    { eyebrow: "Set up", title: "Turn a local shop into a digital storefront", description: "Create the business profile customers see, set operating hours, describe what you sell and provide the contact and payout information needed to operate.", points: ["Shop identity", "Business category", "Opening hours", "Location and contact"], visualLabel: "Vendor onboarding", image: "/images/products/vendors/vendor-onboarding.png" },
    { eyebrow: "Catalogue", title: "Keep products visible and manageable", description: "Add and edit product details, control visibility and give customers a clear place to discover the materials connected to their work.", points: ["Product creation", "Pricing", "Visibility controls", "Catalogue management"], visualLabel: "Product catalogue", image: "/images/products/vendors/product-catalogue.png" },
    { eyebrow: "Fulfil", title: "Handle incoming orders with clarity", description: "Review customer orders, understand items and totals, accept work you can fulfil and keep order status organised from the same app.", points: ["Order filters", "Accept or decline", "Order detail", "Recent activity"], visualLabel: "Vendor orders", image: "/images/products/vendors/vendor-orders.png" },
    { eyebrow: "Earn", title: "See what the shop is generating", description: "Monitor sales, available and pending balances, review transactions and request withdrawals directly to MoMo.", points: ["Sales overview", "Available balance", "Payout requests", "Transaction history"], visualLabel: "Wallet and sales" },
  ],
  closingTitle: "Local supply belongs in the digital service journey.", closingBody: "Vendors become a visible, measurable part of how customers and specialists source what every job needs.", primaryLabel: "Install vendor app", secondaryHref: "/marketplace", secondaryLabel: "Explore marketplace",
};

export const marketplaceStory: ProductStory = {
  heroImage: "/landing6.png",
  eyebrow: "Beagine Marketplace",
  title: <>Book the work.<br/>Find the materials.<br/><em className="not-italic text-[#FF5F15]">Finish the job.</em></>,
  intro: "A local marketplace designed around the real relationship between customers, skilled specialists, shops and the materials that keep work moving.", audience: "Connected commerce",
  stats: [{ value: "3", label: "Customers, specialists and vendors" }, { value: "Near", label: "Local shops and useful products" }, { value: "One", label: "Connected service ecosystem" }, { value: "More", label: "Opportunity for local businesses" }],
  features: [
    { eyebrow: "Discover", title: "Useful shops, close to the work", description: "Customers can browse nearby vendors, search by category and find supplies without leaving the Beagine experience.", points: ["Nearby shops", "Category discovery", "Product search", "Shop profiles"], visualLabel: "Nearby marketplace shops", image: "/images/products/marketplace/nearby-marketplace-shops.png" },
    { eyebrow: "Purchase", title: "A straightforward path from product to order", description: "Build a cart, review the order, check out and follow fulfilment through a clear mobile flow.", points: ["Product detail", "Cart", "Checkout", "Order history"], visualLabel: "Cart and checkout", image: "/images/products/marketplace/cart-and-checkout.png" },
    { eyebrow: "Supply", title: "Put vendors where demand already exists", description: "The marketplace connects shops to customers and professionals who are already planning, completing or maintaining real work.", points: ["Vendor storefronts", "Order management", "Sales visibility", "Local reach"], visualLabel: "Vendor order dashboard", image: "/images/products/marketplace/vendor-order-dashboard.png" },
  ],
  closingTitle: "Commerce that understands the job behind the purchase.", closingBody: "Beagine Marketplace is designed to close the gap between needing skilled work and sourcing what that work requires.", primaryLabel: "Open marketplace", secondaryHref: "/vendors", secondaryLabel: "Sell on Beagine",
};

export const safetyStory: ProductStory = {
  heroImage: "/landing5.png",
  eyebrow: "Trust & safety",
  title: <>Confidence before,<br/>during and <em className="not-italic text-[#FF5F15]">after every job.</em></>,
  intro: "Trust is not a badge at the top of a profile. It is a system of identity, context, communication, consent, evidence and support around the entire service journey.", audience: "Safety system",
  stats: [{ value: "Before", label: "Profiles, verification and site context" }, { value: "During", label: "Communication and emergency tools" }, { value: "After", label: "Proof, records and reporting" }, { value: "Private", label: "Consent-led sharing controls" }],
  features: [
    { eyebrow: "Know who you are working with", title: "Context before commitment", description: "Customers can review specialist identity, services, portfolio and ratings. Specialists can receive relevant customer and site-safety information before accepting.", points: ["Verified profiles", "Portfolio and reviews", "Safety profile", "Site flags"], visualLabel: "Verified specialist profile", image: "/images/products/safety/verified-specialist-profile.png" },
    { eyebrow: "Stay connected", title: "Tools for the active job", description: "Booking-linked chat, calls, live status and location context keep communication attached to the work instead of scattered across personal channels.", points: ["Booking chat", "Masked calls", "Live status", "Emergency contacts"], visualLabel: "Active job safety", image: "/images/products/safety/active-job-safety.png" },
    { eyebrow: "Respond", title: "Emergency support when normal flow breaks", description: "SOS tools, live-location sharing and manual emergency contact options give both sides a clearer response path during field work.", points: ["SOS activation", "Live location", "Emergency contacts", "Clear cancellation state"], visualLabel: "SOS and emergency flow", image: "/images/products/safety/sos-and-emergency-flow.png" },
    { eyebrow: "Accountability", title: "Keep evidence and consent attached", description: "Completion proof, scope-change history, receipts, reports and Spotlight permissions create a stronger record without turning private work into public content by default.", points: ["Before-and-after proof", "Scope history", "Reports and disputes", "Sharing consent"], visualLabel: "Completion record" },
  ],
  closingTitle: "Trust should be designed into the workflow.", closingBody: "Beagine combines prevention, visibility, response and accountability so every role has more context and control.", primaryLabel: "Explore Beagine", secondaryHref: "/community-standards", secondaryLabel: "Community standards",
};

export const ecosystemStory: ProductStory = {
  heroImage: "/landing10.png",
  eyebrow: "The engineering ecosystem",
  title: <>Three sides of work.<br/><em className="not-italic text-[#FF5F15]">One connected system.</em></>,
  intro: "Beagine connects the people who need skilled work, the professionals who deliver it and the local businesses that supply it.", audience: "Beagine ecosystem",
  stats: [{ value: "Need", label: "Customers create real service demand" }, { value: "Skill", label: "Specialists deliver verified work" }, { value: "Supply", label: "Vendors keep jobs moving" }, { value: "Growth", label: "Reputation and commerce compound" }],
  features: [
    { eyebrow: "Customers", title: "Demand becomes structured, visible work", description: "Customers move from an urgent or planned need to a documented service journey with clearer choice, communication and outcomes.", points: ["Service discovery", "Booking", "Safety", "Marketplace access"], visualLabel: "Customer service journey" },
    { eyebrow: "Specialists", title: "Skill becomes a portable professional identity", description: "Professionals gain visibility, operational tools, job records, earnings history and verified outcomes that strengthen future opportunity.", points: ["Professional profile", "Work management", "Completion proof", "Reputation growth"], visualLabel: "Specialist professional profile" },
    { eyebrow: "Vendors", title: "Local supply meets active demand", description: "Shops can digitise products and operations while participating directly in the ecosystem that creates demand for tools and materials.", points: ["Digital storefront", "Product catalogue", "Orders", "Payouts"], visualLabel: "Vendor storefront" },
    { eyebrow: "Community", title: "Every completed job can strengthen the next one", description: "Reviews, Spotlight achievements, referrals, service data and learning turn individual transactions into stronger professional and local-market infrastructure.", points: ["Recognition", "Trust signals", "Organic sharing", "Learning and advancement"], visualLabel: "Spotlight achievement" },
  ],
  closingTitle: "Infrastructure for the hands-on economy.", closingBody: "The long-term opportunity is bigger than matching supply and demand. It is building the digital layer through which skilled work earns trust, visibility and value.", primaryLabel: "Join the ecosystem", secondaryHref: "/about", secondaryLabel: "About Beagine",
};
