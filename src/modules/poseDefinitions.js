/**
 * Expanded 16 Toddler & Kid Motion Poses with Cartoon SVG illustrations.
 */

export const POSES = [
  {
    id: 'reach_stars',
    name: 'Reach For The Stars!',
    emoji: '🌟',
    prompt: 'Stretch both hands WAY UP high to the stars!',
    audioPrompt: 'Reach for the stars! Stretch both hands up high!',
    color: '#FFD700',
    bgGradient: 'linear-gradient(135deg, #FFF9C4 0%, #FFF176 100%)',
    svgPath: `
      <text x="35" y="30" font-size="24">⭐</text>
      <text x="145" y="25" font-size="24">⭐</text>
      <circle cx="100" cy="50" r="22" fill="#FFB74D" stroke="#E65100" stroke-width="3"/>
      <circle cx="93" cy="46" r="3" fill="#000"/><circle cx="107" cy="46" r="3" fill="#000"/>
      <path d="M92 56 Q100 64 108 56" fill="none" stroke="#D84315" stroke-width="3" stroke-linecap="round"/>
      <rect x="85" y="72" width="30" height="50" rx="10" fill="#4FC3F7" stroke="#0277BD" stroke-width="3"/>
      <path d="M85 80 Q60 50 55 18" fill="none" stroke="#FF7043" stroke-width="12" stroke-linecap="round"/>
      <path d="M115 80 Q140 50 145 18" fill="none" stroke="#FF7043" stroke-width="12" stroke-linecap="round"/>
      <circle cx="55" cy="18" r="8" fill="#FFCC80"/><circle cx="145" cy="18" r="8" fill="#FFCC80"/>
      <rect x="86" y="122" width="12" height="50" rx="6" fill="#7E57C2"/>
      <rect x="102" y="122" width="12" height="50" rx="6" fill="#7E57C2"/>
    `
  },
  {
    id: 'airplane_wings',
    name: 'Airplane Wings!',
    emoji: '✈️',
    prompt: 'Spread your arms out wide like a zooming plane!',
    audioPrompt: 'Airplane wings! Spread your arms out wide to the sides!',
    color: '#29B6F6',
    bgGradient: 'linear-gradient(135deg, #E1F5FE 0%, #81D4FA 100%)',
    svgPath: `
      <text x="15" y="45" font-size="26">☁️</text><text x="155" y="45" font-size="26">☁️</text>
      <circle cx="100" cy="55" r="22" fill="#FFB74D" stroke="#E65100" stroke-width="3"/>
      <circle cx="93" cy="51" r="3" fill="#000"/><circle cx="107" cy="51" r="3" fill="#000"/>
      <path d="M92 61 Q100 68 108 61" fill="none" stroke="#D84315" stroke-width="3" stroke-linecap="round"/>
      <rect x="85" y="77" width="30" height="48" rx="10" fill="#66BB6A" stroke="#2E7D32" stroke-width="3"/>
      <path d="M85 85 L20 85" stroke="#FF7043" stroke-width="12" stroke-linecap="round"/>
      <path d="M115 85 L180 85" stroke="#FF7043" stroke-width="12" stroke-linecap="round"/>
      <circle cx="15" cy="85" r="8" fill="#FFCC80"/><circle cx="185" cy="85" r="8" fill="#FFCC80"/>
      <rect x="86" y="125" width="12" height="48" rx="6" fill="#42A5F5"/>
      <rect x="102" y="125" width="12" height="48" rx="6" fill="#42A5F5"/>
    `
  },
  {
    id: 'dino_roar',
    name: 'Dino Roar!',
    emoji: '🦖',
    prompt: 'Bend your claws up high and ROAR like a T-Rex!',
    audioPrompt: 'Dino Roar! Bend your claws up high and roar!',
    color: '#66BB6A',
    bgGradient: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)',
    svgPath: `
      <text x="20" y="40" font-size="24">🌴</text><text x="155" y="40" font-size="24">🌋</text>
      <circle cx="100" cy="50" r="22" fill="#FFB74D" stroke="#E65100" stroke-width="3"/>
      <circle cx="93" cy="46" r="3" fill="#000"/><circle cx="107" cy="46" r="3" fill="#000"/>
      <ellipse cx="100" cy="58" rx="7" ry="5" fill="#D50000"/>
      <rect x="85" y="72" width="30" height="50" rx="10" fill="#9CCC65" stroke="#33691E" stroke-width="3"/>
      <path d="M85 82 L65 72 L68 52" fill="none" stroke="#FF7043" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M115 82 L135 72 L132 52" fill="none" stroke="#FF7043" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/>
      <rect x="86" y="122" width="12" height="48" rx="6" fill="#5D4037"/>
      <rect x="102" y="122" width="12" height="48" rx="6" fill="#5D4037"/>
    `
  },
  {
    id: 'superhero_fly',
    name: 'Superhero Flying!',
    emoji: '🦸',
    prompt: 'Point ONE fist high into the sky to fly!',
    audioPrompt: 'Superhero Flying! Stretch one fist way up into the sky!',
    color: '#FF4081',
    bgGradient: 'linear-gradient(135deg, #FCE4EC 0%, #FF80AB 100%)',
    svgPath: `
      <path d="M75 75 Q40 100 45 150 Q90 140 85 125 Z" fill="#D50000"/>
      <circle cx="100" cy="45" r="22" fill="#FFB74D" stroke="#E65100" stroke-width="3"/>
      <circle cx="93" cy="41" r="3" fill="#000"/><circle cx="107" cy="41" r="3" fill="#000"/>
      <path d="M80 38 Q100 48 120 38 Q115 48 85 48 Z" fill="#FFD700"/>
      <rect x="85" y="67" width="30" height="50" rx="10" fill="#29B6F6" stroke="#0277BD" stroke-width="3"/>
      <path d="M85 75 L60 30 L55 12" fill="none" stroke="#FF7043" stroke-width="12" stroke-linecap="round"/>
      <circle cx="55" cy="12" r="9" fill="#FFCC80"/>
      <path d="M115 75 L135 105" stroke="#FF7043" stroke-width="11" stroke-linecap="round"/>
      <rect x="86" y="117" width="12" height="52" rx="6" fill="#D50000"/>
      <rect x="102" y="117" width="12" height="52" rx="6" fill="#D50000"/>
    `
  },
  {
    id: 'bunny_squat',
    name: 'Little Bunny Hop!',
    emoji: '🐰',
    prompt: 'Crouch down low with paws near your chest!',
    audioPrompt: 'Little bunny hop! Crouch down low like a happy bunny!',
    color: '#EC407A',
    bgGradient: 'linear-gradient(135deg, #FCE4EC 0%, #F8BBD0 100%)',
    svgPath: `
      <ellipse cx="88" cy="25" rx="8" ry="20" fill="#FF80AB" stroke="#C2185B" stroke-width="3"/>
      <ellipse cx="112" cy="25" rx="8" ry="20" fill="#FF80AB" stroke="#C2185B" stroke-width="3"/>
      <circle cx="100" cy="60" r="22" fill="#FFB74D" stroke="#E65100" stroke-width="3"/>
      <circle cx="93" cy="56" r="3" fill="#000"/><circle cx="107" cy="56" r="3" fill="#000"/>
      <rect x="85" y="82" width="30" height="42" rx="10" fill="#AB47BC" stroke="#4A148C" stroke-width="3"/>
      <path d="M85 92 Q72 82 82 72" stroke="#FF7043" stroke-width="10" stroke-linecap="round" fill="none"/>
      <path d="M115 92 Q128 82 118 72" stroke="#FF7043" stroke-width="10" stroke-linecap="round" fill="none"/>
      <path d="M86 124 L65 140 L85 168" stroke="#7E57C2" stroke-width="12" fill="none" stroke-linecap="round"/>
      <path d="M114 124 L135 140 L115 168" stroke="#7E57C2" stroke-width="12" fill="none" stroke-linecap="round"/>
    `
  },
  {
    id: 'disco_dance',
    name: 'Disco Dance Party!',
    emoji: '🕺',
    prompt: 'Point ONE arm UP diagonal & ONE arm DOWN!',
    audioPrompt: 'Disco Dance Party! Point one arm way up and one arm down!',
    color: '#AB47BC',
    bgGradient: 'linear-gradient(135deg, #F3E5F5 0%, #CE93D8 100%)',
    svgPath: `
      <text x="85" y="25" font-size="24">🪩</text>
      <circle cx="100" cy="50" r="22" fill="#FFB74D" stroke="#E65100" stroke-width="3"/>
      <circle cx="93" cy="46" r="3" fill="#000"/><circle cx="107" cy="46" r="3" fill="#000"/>
      <rect x="85" y="72" width="30" height="50" rx="10" fill="#EC407A" stroke="#880E4F" stroke-width="3"/>
      <path d="M85 80 L35 35" stroke="#FF7043" stroke-width="12" stroke-linecap="round"/>
      <path d="M115 80 L165 125" stroke="#FF7043" stroke-width="12" stroke-linecap="round"/>
      <circle cx="30" cy="30" r="8" fill="#FFCC80"/><circle cx="170" cy="130" r="8" fill="#FFCC80"/>
      <rect x="86" y="122" width="12" height="50" rx="6" fill="#00E676"/>
      <rect x="102" y="122" width="12" height="50" rx="6" fill="#00E676"/>
    `
  },
  {
    id: 'flamingo_balance',
    name: 'Flamingo Balance!',
    emoji: '🦩',
    prompt: 'Lift ONE knee up & spread arms like a flamingo!',
    audioPrompt: 'Flamingo Balance! Lift one knee up and balance!',
    color: '#FF80AB',
    bgGradient: 'linear-gradient(135deg, #FCE4EC 0%, #FF4081 100%)',
    svgPath: `
      <circle cx="100" cy="48" r="22" fill="#FFB74D" stroke="#E65100" stroke-width="3"/>
      <circle cx="93" cy="44" r="3" fill="#000"/><circle cx="107" cy="44" r="3" fill="#000"/>
      <rect x="85" y="70" width="30" height="48" rx="10" fill="#FF4081" stroke="#C2185B" stroke-width="3"/>
      <path d="M85 78 L30 70" stroke="#FF7043" stroke-width="11" stroke-linecap="round"/>
      <path d="M115 78 L170 70" stroke="#FF7043" stroke-width="11" stroke-linecap="round"/>
      <!-- Straight leg -->
      <rect x="86" y="118" width="12" height="55" rx="6" fill="#FF4081"/>
      <!-- Bent lifted leg -->
      <path d="M102 118 L135 135 L108 145" stroke="#FF4081" stroke-width="12" stroke-linecap="round" fill="none"/>
    `
  },
  {
    id: 'froggy_jump',
    name: 'Froggy Jump!',
    emoji: '🐸',
    prompt: 'Squat low and touch the floor like a frog!',
    audioPrompt: 'Froggy jump! Squat down low and touch the floor!',
    color: '#00E676',
    bgGradient: 'linear-gradient(135deg, #E8F5E9 0%, #B9F6CA 100%)',
    svgPath: `
      <circle cx="100" cy="65" r="22" fill="#FFB74D" stroke="#E65100" stroke-width="3"/>
      <circle cx="93" cy="61" r="3" fill="#000"/><circle cx="107" cy="61" r="3" fill="#000"/>
      <rect x="85" y="87" width="30" height="40" rx="10" fill="#00E676" stroke="#00A152" stroke-width="3"/>
      <!-- Arms touching floor -->
      <path d="M85 97 L65 145 L75 175" stroke="#FF7043" stroke-width="11" stroke-linecap="round" fill="none"/>
      <path d="M115 97 L135 145 L125 175" stroke="#FF7043" stroke-width="11" stroke-linecap="round" fill="none"/>
    `
  },
  {
    id: 'archer_bow',
    name: 'Super Archer!',
    emoji: '🏹',
    prompt: 'Pull one arm back to your ear & point the other arm out!',
    audioPrompt: 'Super Archer! Pull back your bow and aim!',
    color: '#FF9100',
    bgGradient: 'linear-gradient(135deg, #FFF3E0 0%, #FFB74D 100%)',
    svgPath: `
      <text x="145" y="30" font-size="24">🎯</text>
      <circle cx="100" cy="50" r="22" fill="#FFB74D" stroke="#E65100" stroke-width="3"/>
      <rect x="85" y="72" width="30" height="50" rx="10" fill="#FF9100" stroke="#E65100" stroke-width="3"/>
      <!-- Forward pointing arm -->
      <path d="M85 80 L20 80" stroke="#FF7043" stroke-width="12" stroke-linecap="round"/>
      <!-- Pulled back elbow arm -->
      <path d="M115 80 L140 70 L115 65" stroke="#FF7043" stroke-width="12" stroke-linecap="round" fill="none"/>
      <rect x="86" y="122" width="12" height="50" rx="6" fill="#3E2723"/>
      <rect x="102" y="122" width="12" height="50" rx="6" fill="#3E2723"/>
    `
  },
  {
    id: 'tree_pose',
    name: 'Tall Tree Pose!',
    emoji: '🌲',
    prompt: 'Put your hands together OVERHEAD like a tall tree!',
    audioPrompt: 'Tall Tree Pose! Put both hands together high over your head!',
    color: '#43A047',
    bgGradient: 'linear-gradient(135deg, #E8F5E9 0%, #A5D6A7 100%)',
    svgPath: `
      <circle cx="100" cy="60" r="22" fill="#FFB74D" stroke="#E65100" stroke-width="3"/>
      <rect x="85" y="82" width="30" height="48" rx="10" fill="#43A047" stroke="#1B5E20" stroke-width="3"/>
      <!-- Joined overhead hands -->
      <path d="M85 90 Q65 40 100 15 Q135 40 115 90" stroke="#FF7043" stroke-width="12" stroke-linecap="round" fill="none"/>
      <circle cx="100" cy="15" r="9" fill="#FFCC80"/>
      <rect x="86" y="130" width="12" height="45" rx="6" fill="#795548"/>
      <rect x="102" y="130" width="12" height="45" rx="6" fill="#795548"/>
    `
  },
  {
    id: 'cross_arms',
    name: 'Superhero Shield!',
    emoji: '🙅',
    prompt: 'Cross both arms over your chest in an X shape!',
    audioPrompt: 'Superhero Shield! Cross your arms in a giant X over your chest!',
    color: '#00B0FF',
    bgGradient: 'linear-gradient(135deg, #E0F7FA 0%, #80D8FF 100%)',
    svgPath: `
      <text x="145" y="30" font-size="24">🛡️</text>
      <circle cx="100" cy="50" r="22" fill="#FFB74D" stroke="#E65100" stroke-width="3"/>
      <rect x="85" y="72" width="30" height="50" rx="10" fill="#00B0FF" stroke="#004D40" stroke-width="3"/>
      <!-- Crossed arms X shape -->
      <path d="M80 82 L120 102" stroke="#FF7043" stroke-width="12" stroke-linecap="round"/>
      <path d="M120 82 L80 102" stroke="#FF7043" stroke-width="12" stroke-linecap="round"/>
      <rect x="86" y="122" width="12" height="50" rx="6" fill="#304FFE"/>
      <rect x="102" y="122" width="12" height="50" rx="6" fill="#304FFE"/>
    `
  },
  {
    id: 'surf_wave',
    name: 'Surfer Balance!',
    emoji: '🏄',
    prompt: 'Stand sideways & spread your arms to ride the wave!',
    audioPrompt: 'Surfer balance! Stand wide and balance on your surfboard!',
    color: '#00E5FF',
    bgGradient: 'linear-gradient(135deg, #E0F7FA 0%, #84FFFF 100%)',
    svgPath: `
      <text x="20" y="170" font-size="24">🌊</text><text x="155" y="170" font-size="24">🌊</text>
      <circle cx="100" cy="48" r="22" fill="#FFB74D" stroke="#E65100" stroke-width="3"/>
      <rect x="85" y="70" width="30" height="48" rx="10" fill="#00E5FF" stroke="#006064" stroke-width="3"/>
      <path d="M85 78 L20 65" stroke="#FF7043" stroke-width="11" stroke-linecap="round"/>
      <path d="M115 78 L180 65" stroke="#FF7043" stroke-width="11" stroke-linecap="round"/>
      <path d="M86 118 L60 160" stroke="#FF7043" stroke-width="12" stroke-linecap="round"/>
      <path d="M102 118 L140 160" stroke="#FF7043" stroke-width="12" stroke-linecap="round"/>
      <!-- Surfboard -->
      <ellipse cx="100" cy="168" rx="70" ry="8" fill="#FFD54F" stroke="#FF6F00" stroke-width="3"/>
    `
  },
  {
    id: 'kick_goal',
    name: 'Champion Kick!',
    emoji: '⚽',
    prompt: 'Kick ONE leg forward like a soccer champion!',
    audioPrompt: 'Champion Kick! Kick one leg forward high!',
    color: '#76FF03',
    bgGradient: 'linear-gradient(135deg, #F4FF81 0%, #CCFF90 100%)',
    svgPath: `
      <text x="145" y="130" font-size="24">⚽</text>
      <circle cx="100" cy="48" r="22" fill="#FFB74D" stroke="#E65100" stroke-width="3"/>
      <rect x="85" y="70" width="30" height="48" rx="10" fill="#76FF03" stroke="#33691E" stroke-width="3"/>
      <path d="M85 78 L40 90" stroke="#FF7043" stroke-width="11" stroke-linecap="round"/>
      <path d="M115 78 L160 90" stroke="#FF7043" stroke-width="11" stroke-linecap="round"/>
      <!-- Standing leg -->
      <rect x="86" y="118" width="12" height="52" rx="6" fill="#1A237E"/>
      <!-- Kicking leg extended -->
      <path d="M102 118 L145 135" stroke="#FF7043" stroke-width="12" stroke-linecap="round"/>
    `
  },
  {
    id: 'kitty_stretch',
    name: 'Kitty Cat Stretch!',
    emoji: '🐱',
    prompt: 'Put hands down low & stretch like a happy kitty!',
    audioPrompt: 'Kitty cat stretch! Put hands down low and stretch!',
    color: '#FFAB40',
    bgGradient: 'linear-gradient(135deg, #FFF8E1 0%, #FFE082 100%)',
    svgPath: `
      <circle cx="100" cy="55" r="22" fill="#FFB74D" stroke="#E65100" stroke-width="3"/>
      <rect x="85" y="77" width="30" height="45" rx="10" fill="#FFAB40" stroke="#E65100" stroke-width="3"/>
      <path d="M85 85 L50 145" stroke="#FF7043" stroke-width="11" stroke-linecap="round"/>
      <path d="M115 85 L150 145" stroke="#FF7043" stroke-width="11" stroke-linecap="round"/>
      <rect x="86" y="122" width="12" height="48" rx="6" fill="#5D4037"/>
      <rect x="102" y="122" width="12" height="48" rx="6" fill="#5D4037"/>
    `
  },
  {
    id: 'gorilla_tap',
    name: 'Gorilla Power!',
    emoji: '🦍',
    prompt: 'Hold both hands near your chest like a mighty gorilla!',
    audioPrompt: 'Gorilla Power! Bring hands up near your chest like a gorilla!',
    color: '#8D6E63',
    bgGradient: 'linear-gradient(135deg, #EFEBE9 0%, #D7CCC8 100%)',
    svgPath: `
      <circle cx="100" cy="50" r="22" fill="#FFB74D" stroke="#E65100" stroke-width="3"/>
      <rect x="80" y="72" width="40" height="50" rx="12" fill="#6D4C41" stroke="#3E2723" stroke-width="3"/>
      <path d="M80 82 Q60 85 85 92" stroke="#FF7043" stroke-width="12" stroke-linecap="round" fill="none"/>
      <path d="M120 82 Q140 85 115 92" stroke="#FF7043" stroke-width="12" stroke-linecap="round" fill="none"/>
      <circle cx="85" cy="92" r="8" fill="#FFCC80"/><circle cx="115" cy="92" r="8" fill="#FFCC80"/>
      <rect x="84" y="122" width="14" height="48" rx="6" fill="#4E342E"/>
      <rect x="102" y="122" width="14" height="48" rx="6" fill="#4E342E"/>
    `
  },
  {
    id: 'zen_master',
    name: 'Master Panda!',
    emoji: '🐼',
    prompt: 'Press hands together at chest level like a calm panda!',
    audioPrompt: 'Master Panda! Press your hands together at your chest!',
    color: '#90A4AE',
    bgGradient: 'linear-gradient(135deg, #ECEFF1 0%, #CFD8DC 100%)',
    svgPath: `
      <circle cx="100" cy="50" r="22" fill="#FFB74D" stroke="#E65100" stroke-width="3"/>
      <rect x="85" y="72" width="30" height="50" rx="10" fill="#37474F" stroke="#263238" stroke-width="3"/>
      <!-- Hands pressed together at center -->
      <path d="M85 82 L100 88 M115 82 L100 88" stroke="#FF7043" stroke-width="12" stroke-linecap="round"/>
      <circle cx="100" cy="88" r="8" fill="#FFCC80"/>
      <rect x="86" y="122" width="12" height="50" rx="6" fill="#263238"/>
      <rect x="102" y="122" width="12" height="50" rx="6" fill="#263238"/>
    `
  }
];
