/**
 * Definition of target poses for 3-year-olds.
 * Includes visual SVG representations, title, prompt text, audio prompt, and matching criteria.
 */

export const POSES = [
  {
    id: 'reach_stars',
    name: 'Reach For The Stars!',
    emoji: '🌟',
    prompt: 'Reach both arms WAY UP high to touch the stars!',
    audioPrompt: 'Reach for the stars! Stretch both hands up high!',
    color: '#FFD700', // Star Gold
    bgGradient: 'linear-gradient(135deg, #FFF9C4 0%, #FFF176 100%)',
    // Criteria evaluated by poseMatcher
    criteria: {
      leftArmUp: true,
      rightArmUp: true,
      minArmAngle: 120
    },
    // SVG stick figure guide
    svgPath: `
      <!-- Head -->
      <circle cx="100" cy="45" r="18" fill="#FF8A65"/>
      <!-- Body -->
      <line x1="100" y1="63" x2="100" y2="120" stroke="#37474F" stroke-width="8" stroke-linecap="round"/>
      <!-- Left Arm Up -->
      <polyline points="100,75 70,30 65,10" fill="none" stroke="#FF5722" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Right Arm Up -->
      <polyline points="100,75 130,30 135,10" fill="none" stroke="#FF5722" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Left Leg -->
      <polyline points="100,120 80,170" fill="none" stroke="#37474F" stroke-width="8" stroke-linecap="round"/>
      <!-- Right Leg -->
      <polyline points="100,120 120,170" fill="none" stroke="#37474F" stroke-width="8" stroke-linecap="round"/>
      <!-- Stars -->
      <text x="50" y="20" font-size="20">⭐</text>
      <text x="130" y="20" font-size="20">⭐</text>
    `
  },
  {
    id: 'airplane_wings',
    name: 'Airplane Wings!',
    emoji: '✈️',
    prompt: 'Spread your arms out wide like airplane wings!',
    audioPrompt: 'Airplane wings! Spread your arms out wide to the sides!',
    color: '#29B6F6', // Sky Blue
    bgGradient: 'linear-gradient(135deg, #E1F5FE 0%, #81D4FA 100%)',
    criteria: {
      leftArmWide: true,
      rightArmWide: true
    },
    svgPath: `
      <!-- Head -->
      <circle cx="100" cy="50" r="18" fill="#FF8A65"/>
      <!-- Body -->
      <line x1="100" y1="68" x2="100" y2="125" stroke="#37474F" stroke-width="8" stroke-linecap="round"/>
      <!-- Left Arm Wide -->
      <polyline points="100,80 40,80 15,80" fill="none" stroke="#0288D1" stroke-width="7" stroke-linecap="round"/>
      <!-- Right Arm Wide -->
      <polyline points="100,80 160,80 185,80" fill="none" stroke="#0288D1" stroke-width="7" stroke-linecap="round"/>
      <!-- Left Leg -->
      <polyline points="100,125 82,175" fill="none" stroke="#37474F" stroke-width="8" stroke-linecap="round"/>
      <!-- Right Leg -->
      <polyline points="100,125 118,175" fill="none" stroke="#37474F" stroke-width="8" stroke-linecap="round"/>
      <!-- Clouds -->
      <text x="20" y="40" font-size="18">☁️</text>
      <text x="160" y="40" font-size="18">☁️</text>
    `
  },
  {
    id: 'super_high_five',
    name: 'Super High Five!',
    emoji: '✋',
    prompt: 'Put ONE hand up high for a big High-Five!',
    audioPrompt: 'Super High Five! Wave one hand way up high!',
    color: '#AB47BC', // Purple
    bgGradient: 'linear-gradient(135deg, #F3E5F5 0%, #CE93D8 100%)',
    criteria: {
      oneArmUp: true
    },
    svgPath: `
      <!-- Head -->
      <circle cx="100" cy="50" r="18" fill="#FF8A65"/>
      <!-- Body -->
      <line x1="100" y1="68" x2="100" y2="125" stroke="#37474F" stroke-width="8" stroke-linecap="round"/>
      <!-- Left Arm Up -->
      <polyline points="100,80 75,35 70,12" fill="none" stroke="#8E24AA" stroke-width="7" stroke-linecap="round"/>
      <!-- Right Arm Down -->
      <polyline points="100,80 130,110 135,130" fill="none" stroke="#8E24AA" stroke-width="7" stroke-linecap="round"/>
      <!-- Left Leg -->
      <polyline points="100,125 80,175" fill="none" stroke="#37474F" stroke-width="8" stroke-linecap="round"/>
      <!-- Right Leg -->
      <polyline points="100,125 120,175" fill="none" stroke="#37474F" stroke-width="8" stroke-linecap="round"/>
      <!-- Hand Sparkle -->
      <text x="55" y="20" font-size="22">✨</text>
    `
  },
  {
    id: 'bunny_squat',
    name: 'Little Bunny Hop!',
    emoji: '🐰',
    prompt: 'Bend your knees and crouch down like a cute bunny!',
    audioPrompt: 'Little bunny hop! Crouch down low like a bunny!',
    color: '#EC407A', // Pink
    bgGradient: 'linear-gradient(135deg, #FCE4EC 0%, #F8BBD0 100%)',
    criteria: {
      isSquatting: true
    },
    svgPath: `
      <!-- Head -->
      <circle cx="100" cy="70" r="18" fill="#FF8A65"/>
      <!-- Body -->
      <line x1="100" y1="88" x2="100" y2="135" stroke="#37474F" stroke-width="8" stroke-linecap="round"/>
      <!-- Bunny Paw Arms -->
      <polyline points="100,95 75,80 80,65" fill="none" stroke="#D81B60" stroke-width="7" stroke-linecap="round"/>
      <polyline points="100,95 125,80 120,65" fill="none" stroke="#D81B60" stroke-width="7" stroke-linecap="round"/>
      <!-- Bent Legs (Squat) -->
      <polyline points="100,135 65,150 75,180" fill="none" stroke="#37474F" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
      <polyline points="100,135 135,150 125,180" fill="none" stroke="#37474F" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Carrot -->
      <text x="145" y="85" font-size="20">🥕</text>
    `
  },
  {
    id: 'star_jump',
    name: 'Shining Star!',
    emoji: '⭐',
    prompt: 'Make a BIG STAR shape with arms wide and legs wide!',
    audioPrompt: 'Shining star! Make a big star shape with your arms and legs wide!',
    color: '#FFA726', // Orange
    bgGradient: 'linear-gradient(135deg, #FFF3E0 0%, #FFCC80 100%)',
    criteria: {
      leftArmUpDiagonal: true,
      rightArmUpDiagonal: true,
      legsWide: true
    },
    svgPath: `
      <!-- Head -->
      <circle cx="100" cy="45" r="18" fill="#FF8A65"/>
      <!-- Body -->
      <line x1="100" y1="63" x2="100" y2="115" stroke="#37474F" stroke-width="8" stroke-linecap="round"/>
      <!-- Left Arm Diagonal Up -->
      <polyline points="100,75 50,45 25,25" fill="none" stroke="#FB8C00" stroke-width="7" stroke-linecap="round"/>
      <!-- Right Arm Diagonal Up -->
      <polyline points="100,75 150,45 175,25" fill="none" stroke="#FB8C00" stroke-width="7" stroke-linecap="round"/>
      <!-- Left Leg Wide -->
      <polyline points="100,115 55,175" fill="none" stroke="#37474F" stroke-width="8" stroke-linecap="round"/>
      <!-- Right Leg Wide -->
      <polyline points="100,115 145,175" fill="none" stroke="#37474F" stroke-width="8" stroke-linecap="round"/>
      <!-- Star Effect -->
      <text x="85" y="30" font-size="22">✨</text>
    `
  },
  {
    id: 'touch_knees',
    name: 'Touch Your Knees!',
    emoji: '🦵',
    prompt: 'Bend down and put your hands on your knees!',
    audioPrompt: 'Touch your knees! Put both hands down on your knees!',
    color: '#66BB6A', // Green
    bgGradient: 'linear-gradient(135deg, #E8F5E9 0%, #A5D6A7 100%)',
    criteria: {
      handsOnKnees: true
    },
    svgPath: `
      <!-- Head -->
      <circle cx="100" cy="55" r="18" fill="#FF8A65"/>
      <!-- Body (Bent forward) -->
      <line x1="100" y1="73" x2="100" y2="125" stroke="#37474F" stroke-width="8" stroke-linecap="round"/>
      <!-- Arms down to knees -->
      <polyline points="100,85 75,130 80,145" fill="none" stroke="#43A047" stroke-width="7" stroke-linecap="round"/>
      <polyline points="100,85 125,130 120,145" fill="none" stroke="#43A047" stroke-width="7" stroke-linecap="round"/>
      <!-- Legs -->
      <polyline points="100,125 80,175" fill="none" stroke="#37474F" stroke-width="8" stroke-linecap="round"/>
      <polyline points="100,125 120,175" fill="none" stroke="#37474F" stroke-width="8" stroke-linecap="round"/>
    `
  }
];
