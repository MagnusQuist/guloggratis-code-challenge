const CARD_VALUES = {
	two: 2,
	three: 3,
	four: 4,
	five: 5,
	six: 6,
	seven: 7,
	eight: 8,
	nine: 9,
	ten: 10,
	jack: 10,
	queen: 10,
	king: 10,
	ace: 11,
} as const;

// Card = "two" | "three" | "four" etc.
type Card = keyof typeof CARD_VALUES;

// Card ranking for comparison
const CARD_RANKS: Record<Card, number> = {
	two: 2,
	three: 3,
	four: 4,
	five: 5,
	six: 6,
	seven: 7,
	eight: 8,
	nine: 9,
	ten: 10,
	jack: 11,
	queen: 12,
	king: 13,
	ace: 14,
};

/**
 *
 * @param dealedCards - Array of drawn cards
 * @returns - Above, below, or Blackjack and highest card
 */
export function blackjackHighest(dealedCards: Card[]): string {
	let total = 0;
	let numAces = 0;
	let highestNonAceCard: Card = "two";
	let highestNonAceRank = 0;

	// for...of as we iterate over values of an iterable (array)
	for (const card of dealedCards) {
		// Add to total
		total += CARD_VALUES[card];

		// Check if card is ace
		if (card === "ace") {
			numAces++;
			// Skip highest card ranking for aces
			continue;
		}

		// Track highest card and rank
		if (CARD_RANKS[card] > highestNonAceRank) {
			highestNonAceRank = CARD_RANKS[card];
			highestNonAceCard = card;
		}
	}

	// While the total score is above 21 and there is still aces left to be changed
	// subtract 10 from the total score to simulate 11 -> 1 and remove one from high aces count
	while (total > 21 && numAces > 0) {
		total -= 10;
		numAces--;
	}

	// Recalculate the highest card after ace conversions
	// If any high aces are left set it as the highest card otherwise, use highest non ace card.
	const highestCard = numAces > 0 ? "ace" : highestNonAceCard;

	if (total == 21) return `blackjack ${highestCard}`;
	if (total > 21) return `above ${highestCard}`;
	return `below ${highestCard}`;
}
