/**
 * Expanded Toddler Pose Definitions with Cartoon SVG illustrations.
 * Includes Dino Roar, Superhero Flying, Disco Dance, Gorilla Power, Bunny Hop, etc.
 */

export const POSES = [
  {
    id: 'reach_stars',
    name: 'Reach For The Stars!',
    emoji: '🌟',
    prompt: 'Reach both arms WAY UP high to touch the glowing stars!',
    audioPrompt: 'Reach for the stars! Stretch both hands up high!',
    color: '#FFD700',
    bgGradient: 'linear-gradient(135deg, #FFF9C4 0%, #FFF176 100%)',
    svgPath: `
      <!-- Cartoon Sky & Clouds -->
      <path d="M20 40 Q35 25 50 40 Q65 25 80 40 Z" fill="#E0F7FA"/>
      <path d="M120 30 Q135 15 150 30 Q165 15 180 30 Z" fill="#E0F7FA"/>
      <!-- Stars -->
      <text x="35" y="30" font-size="24">⭐</text>
      <text x="145" y="25" font-size="24">⭐</text>
      <!-- Head -->
      <circle cx="100" cy="50" r="22" fill="#FFB74D" stroke="#E65100" stroke-width="3"/>
      <circle cx="93" cy="46" r="3" fill="#000"/>
      <circle cx="107" cy="46" r="3" fill="#000"/>
      <path d="M92 56 Q100 64 108 56" fill="none" stroke="#D84315" stroke-width="3" stroke-linecap="round"/>
      <!-- Cheeks -->
      <circle cx="88" cy="53" r="4" fill="#FF8A65" opacity="0.6"/>
      <circle cx="112" cy="53" r="4" fill="#FF8A65" opacity="0.6"/>
      <!-- Body -->
      <rect x="85" y="72" width="30" height="50" rx="10" fill="#4FC3F7" stroke="#0277BD" stroke-width="3"/>
      <!-- Arms Up -->
      <path d="M85 80 Q60 50 55 18" fill="none" stroke="#FF7043" stroke-width="12" stroke-linecap="round"/>
      <path d="M115 80 Q140 50 145 18" fill="none" stroke="#FF7043" stroke-width="12" stroke-linecap="round"/>
      <!-- Hands -->
      <circle cx="55" cy="18" r="8" fill="#FFCC80"/>
      <circle cx="145" cy="18" r="8" fill="#FFCC80"/>
      <!-- Legs -->
      <rect x="86" y="122" width="12" height="50" rx="6" fill="#7E57C2"/>
      <rect x="102" y="122" width="12" height="50" rx="6" fill="#7E57C2"/>
      <!-- Shoes -->
      <ellipse cx="90" cy="174" rx="10" ry="6" fill="#FF4081"/>
      <ellipse cx="110" cy="174" rx="10" ry="6" fill="#FF4081"/>
    `
  },
  {
    id: 'airplane_wings',
    name: 'Airplane Wings!',
    emoji: '✈️',
    prompt: 'Spread your arms out wide like a zooming airplane!',
    audioPrompt: 'Airplane wings! Spread your arms out wide to the sides!',
    color: '#29B6F6',
    bgGradient: 'linear-gradient(135deg, #E1F5FE 0%, #81D4FA 100%)',
    svgPath: `
      <!-- Clouds -->
      <text x="15" y="45" font-size="26">☁️</text>
      <text x="155" y="45" font-size="26">☁️</text>
      <!-- Head -->
      <circle cx="100" cy="55" r="22" fill="#FFB74D" stroke="#E65100" stroke-width="3"/>
      <circle cx="93" cy="51" r="3" fill="#000"/>
      <circle cx="107" cy="51" r="3" fill="#000"/>
      <path d="M92 61 Q100 68 108 61" fill="none" stroke="#D84315" stroke-width="3" stroke-linecap="round"/>
      <!-- Body -->
      <rect x="85" y="77" width="30" height="48" rx="10" fill="#66BB6A" stroke="#2E7D32" stroke-width="3"/>
      <!-- Arms Wide -->
      <path d="M85 85 L20 85" stroke="#FF7043" stroke-width="12" stroke-linecap="round"/>
      <path d="M115 85 L180 85" stroke="#FF7043" stroke-width="12" stroke-linecap="round"/>
      <!-- Hands -->
      <circle cx="15" cy="85" r="8" fill="#FFCC80"/>
      <circle cx="185" cy="85" r="8" fill="#FFCC80"/>
      <!-- Legs -->
      <rect x="86" y="125" width="12" height="48" rx="6" fill="#42A5F5"/>
      <rect x="102" y="125" width="12" height="48" rx="6" fill="#42A5F5"/>
      <!-- Shoes -->
      <ellipse cx="90" cy="175" rx="10" ry="6" fill="#F4511E"/>
      <ellipse cx="110" cy="175" rx="10" ry="6" fill="#F4511E"/>
    `
  },
  {
    id: 'dino_roar',
    name: 'Dino Roar!',
    emoji: '🦖',
    prompt: 'Bend your arms up like sharp T-Rex claws & ROAR!',
    audioPrompt: 'Dino Roar! Bend your claws up high and roar like a T-Rex!',
    color: '#66BB6A',
    bgGradient: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)',
    svgPath: `
      <!-- Volcano & Palms -->
      <text x="20" y="40" font-size="24">🌴</text>
      <text x="155" y="40" font-size="24">🌋</text>
      <!-- Head -->
      <circle cx="100" cy="50" r="22" fill="#FFB74D" stroke="#E65100" stroke-width="3"/>
      <circle cx="93" cy="46" r="3" fill="#000"/>
      <circle cx="107" cy="46" r="3" fill="#000"/>
      <!-- Big Roar Open Mouth -->
      <ellipse cx="100" cy="58" rx="7" ry="5" fill="#D50000"/>
      <!-- Body -->
      <rect x="85" y="72" width="30" height="50" rx="10" fill="#9CCC65" stroke="#33691E" stroke-width="3"/>
      <!-- Dino Claws (Arms bent up) -->
      <path d="M85 82 L65 72 L68 52" fill="none" stroke="#FF7043" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M115 82 L135 72 L132 52" fill="none" stroke="#FF7043" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Claws -->
      <text x="58" y="48" font-size="16">💅</text>
      <text x="122" y="48" font-size="16">💅</text>
      <!-- Legs -->
      <rect x="86" y="122" width="12" height="48" rx="6" fill="#5D4037"/>
      <rect x="102" y="122" width="12" height="48" rx="6" fill="#5D4037"/>
      <!-- Feet -->
      <ellipse cx="88" cy="172" rx="11" ry="6" fill="#388E3C"/>
      <ellipse cx="112" cy="172" rx="11" ry="6" fill="#388E3C"/>
    `
  },
  {
    id: 'superhero_fly',
    name: 'Superhero Flying!',
    emoji: '🦸',
    prompt: 'Point ONE arm high into the sky like a flying superhero!',
    audioPrompt: 'Superhero Flying! Stretch one fist way up into the sky!',
    color: '#FF4081',
    bgGradient: 'linear-gradient(135deg, #FCE4EC 0%, #FF80AB 100%)',
    svgPath: `
      <!-- Cape -->
      <path d="M75 75 Q40 100 45 150 Q90 140 85 125 Z" fill="#D50000"/>
      <!-- Head -->
      <circle cx="100" cy="45" r="22" fill="#FFB74D" stroke="#E65100" stroke-width="3"/>
      <circle cx="93" cy="41" r="3" fill="#000"/>
      <circle cx="107" cy="41" r="3" fill="#000"/>
      <path d="M92 52 Q100 58 108 52" fill="none" stroke="#D84315" stroke-width="3" stroke-linecap="round"/>
      <!-- Mask -->
      <path d="M80 38 Q100 48 120 38 Q115 48 85 48 Z" fill="#FFD700"/>
      <!-- Body -->
      <rect x="85" y="67" width="30" height="50" rx="10" fill="#29B6F6" stroke="#0277BD" stroke-width="3"/>
      <!-- Superhero Emblem -->
      <text x="92" y="94" font-size="16">⚡</text>
      <!-- Left Arm Fist Up -->
      <path d="M85 75 L60 30 L55 12" fill="none" stroke="#FF7043" stroke-width="12" stroke-linecap="round"/>
      <circle cx="55" cy="12" r="9" fill="#FFCC80"/>
      <!-- Right Arm Down -->
      <path d="M115 75 L135 105" stroke="#FF7043" stroke-width="11" stroke-linecap="round"/>
      <!-- Legs -->
      <rect x="86" y="117" width="12" height="52" rx="6" fill="#D50000"/>
      <rect x="102" y="117" width="12" height="52" rx="6" fill="#D50000"/>
    `
  },
  {
    id: 'bunny_squat',
    name: 'Little Bunny Hop!',
    emoji: '🐰',
    prompt: 'Crouch down low with hands near your chest like a cute bunny!',
    audioPrompt: 'Little bunny hop! Crouch down low like a happy bunny!',
    color: '#EC407A',
    bgGradient: 'linear-gradient(135deg, #FCE4EC 0%, #F8BBD0 100%)',
    svgPath: `
      <!-- Bunny Ears -->
      <ellipse cx="88" cy="25" rx="8" ry="20" fill="#FF80AB" stroke="#C2185B" stroke-width="3"/>
      <ellipse cx="112" cy="25" rx="8" ry="20" fill="#FF80AB" stroke="#C2185B" stroke-width="3"/>
      <!-- Head -->
      <circle cx="100" cy="60" r="22" fill="#FFB74D" stroke="#E65100" stroke-width="3"/>
      <circle cx="93" cy="56" r="3" fill="#000"/>
      <circle cx="107" cy="56" r="3" fill="#000"/>
      <circle cx="100" cy="64" r="4" fill="#FF4081"/>
      <!-- Body (Squatting lower) -->
      <rect x="85" y="82" width="30" height="42" rx="10" fill="#AB47BC" stroke="#4A148C" stroke-width="3"/>
      <!-- Bunny Paws -->
      <path d="M85 92 Q72 82 82 72" stroke="#FF7043" stroke-width="10" stroke-linecap="round" fill="none"/>
      <path d="M115 92 Q128 82 118 72" stroke="#FF7043" stroke-width="10" stroke-linecap="round" fill="none"/>
      <!-- Bent Knees -->
      <path d="M86 124 L65 140 L85 168" stroke="#7E57C2" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M114 124 L135 140 L115 168" stroke="#7E57C2" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="145" y="85" font-size="24">🥕</text>
    `
  },
  {
    id: 'disco_dance',
    name: 'Disco Dance Party!',
    emoji: '🕺',
    prompt: 'Point ONE arm UP diagonal & ONE arm DOWN diagonal!',
    audioPrompt: 'Disco Dance Party! Point one arm way up high and one arm down low!',
    color: '#AB47BC',
    bgGradient: 'linear-gradient(135deg, #F3E5F5 0%, #CE93D8 100%)',
    svgPath: `
      <!-- Disco Ball -->
      <text x="85" y="25" font-size="24">🪩</text>
      <!-- Head -->
      <circle cx="100" cy="50" r="22" fill="#FFB74D" stroke="#E65100" stroke-width="3"/>
      <circle cx="93" cy="46" r="3" fill="#000"/>
      <circle cx="107" cy="46" r="3" fill="#000"/>
      <path d="M92 56 Q100 64 108 56" fill="none" stroke="#D84315" stroke-width="3" stroke-linecap="round"/>
      <!-- Body -->
      <rect x="85" y="72" width="30" height="50" rx="10" fill="#EC407A" stroke="#880E4F" stroke-width="3"/>
      <!-- Left Arm Up Diagonal -->
      <path d="M85 80 L35 35" stroke="#FF7043" stroke-width="12" stroke-linecap="round"/>
      <!-- Right Arm Down Diagonal -->
      <path d="M115 80 L165 125" stroke="#FF7043" stroke-width="12" stroke-linecap="round"/>
      <!-- Hands -->
      <circle cx="30" cy="30" r="8" fill="#FFCC80"/>
      <circle cx="170" cy="130" r="8" fill="#FFCC80"/>
      <!-- Legs -->
      <rect x="86" y="122" width="12" height="50" rx="6" fill="#00E676"/>
      <rect x="102" y="122" width="12" height="50" rx="6" fill="#00E676"/>
    `
  },
  {
    id: 'super_high_five',
    name: 'Super High Five!',
    emoji: '✋',
    prompt: 'Put ONE hand up high for a big High-Five!',
    audioPrompt: 'Super High Five! Wave one hand way up high!',
    color: '#FFA726',
    bgGradient: 'linear-gradient(135deg, #FFF3E0 0%, #FFCC80 100%)',
    svgPath: `
      <!-- Sparkle -->
      <text x="50" y="25" font-size="24">✨</text>
      <!-- Head -->
      <circle cx="100" cy="50" r="22" fill="#FFB74D" stroke="#E65100" stroke-width="3"/>
      <circle cx="93" cy="46" r="3" fill="#000"/>
      <circle cx="107" cy="46" r="3" fill="#000"/>
      <!-- Body -->
      <rect x="85" y="72" width="30" height="50" rx="10" fill="#FF7043" stroke="#BF360C" stroke-width="3"/>
      <!-- Left Arm High Five -->
      <path d="M85 80 Q65 45 60 20" stroke="#FF7043" stroke-width="12" stroke-linecap="round" fill="none"/>
      <circle cx="60" cy="20" r="9" fill="#FFCC80"/>
      <!-- Right Arm Down -->
      <path d="M115 80 L140 115" stroke="#FF7043" stroke-width="11" stroke-linecap="round"/>
      <!-- Legs -->
      <rect x="86" y="122" width="12" height="50" rx="6" fill="#1E88E5"/>
      <rect x="102" y="122" width="12" height="50" rx="6" fill="#1E88E5"/>
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
      <!-- Jungle Leaves -->
      <text x="20" y="35" font-size="24">🌿</text>
      <text x="155" y="35" font-size="24">🌿</text>
      <!-- Head -->
      <circle cx="100" cy="50" r="22" fill="#FFB74D" stroke="#E65100" stroke-width="3"/>
      <circle cx="93" cy="46" r="3" fill="#000"/>
      <circle cx="107" cy="46" r="3" fill="#000"/>
      <!-- Body -->
      <rect x="80" y="72" width="40" height="50" rx="12" fill="#6D4C41" stroke="#3E2723" stroke-width="3"/>
      <!-- Gorilla Arms (Hands at chest) -->
      <path d="M80 82 Q60 85 85 92" stroke="#FF7043" stroke-width="12" stroke-linecap="round" fill="none"/>
      <path d="M120 82 Q140 85 115 92" stroke="#FF7043" stroke-width="12" stroke-linecap="round" fill="none"/>
      <circle cx="85" cy="92" r="8" fill="#FFCC80"/>
      <circle cx="115" cy="92" r="8" fill="#FFCC80"/>
      <!-- Legs -->
      <rect x="84" y="122" width="14" height="48" rx="6" fill="#4E342E"/>
      <rect x="102" y="122" width="14" height="48" rx="6" fill="#4E342E"/>
    `
  },
  {
    id: 'touch_knees',
    name: 'Touch Your Knees!',
    emoji: '🦵',
    prompt: 'Bend down and put your hands down on your knees!',
    audioPrompt: 'Touch your knees! Put both hands down on your knees!',
    color: '#26A69A',
    bgGradient: 'linear-gradient(135deg, #E0F2F1 0%, #80CBC4 100%)',
    svgPath: `
      <!-- Head -->
      <circle cx="100" cy="55" r="22" fill="#FFB74D" stroke="#E65100" stroke-width="3"/>
      <circle cx="93" cy="51" r="3" fill="#000"/>
      <circle cx="107" cy="51" r="3" fill="#000"/>
      <!-- Body -->
      <rect x="85" y="77" width="30" height="45" rx="10" fill="#26A69A" stroke="#004D40" stroke-width="3"/>
      <!-- Arms down to knees -->
      <path d="M85 85 L72 135" stroke="#FF7043" stroke-width="11" stroke-linecap="round"/>
      <path d="M115 85 L128 135" stroke="#FF7043" stroke-width="11" stroke-linecap="round"/>
      <!-- Legs -->
      <rect x="86" y="122" width="12" height="50" rx="6" fill="#FF7043"/>
      <rect x="102" y="122" width="12" height="50" rx="6" fill="#FF7043"/>
    `
  }
];
