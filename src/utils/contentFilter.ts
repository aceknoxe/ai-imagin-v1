const RESTRICTED_KEYWORDS = [
  // Adult content
  'nude', 'naked', 'porn', 'xxx', 'sexual', 'nsfw',
  // Violence
  'gore', 'murder', 'torture', 'killing',
  // Illegal content
  'drugs', 'cocaine', 'heroin', 'illegal',
  // Hate speech
  'nazi', 'racist', 'hate',
  // Weapons
  'gun', 'weapon', 'bomb'
];

export function checkContentSafety(prompt: string): { safe: boolean; reason?: string } {
  const lowercasePrompt = prompt.toLowerCase();
  
  // Check for restricted keywords
  const foundKeyword = RESTRICTED_KEYWORDS.find(keyword => 
    lowercasePrompt.includes(keyword)
  );

  if (foundKeyword) {
    return {
      safe: false,
      reason: 'Content contains restricted keywords'
    };
  }

  return { safe: true };
} 