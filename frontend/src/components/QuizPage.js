import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const QuizPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { quizType, timeLimit } = location.state || {};

  // Redirect if no quiz data
  useEffect(() => {
    if (!quizType || !timeLimit) {
      navigate('/');
      return;
    }
  }, [quizType, timeLimit, navigate]);

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(timeLimit * 60); // Convert to seconds
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const questionsRef = useRef([]);
  const totalTime = timeLimit * 60;

  // Sample questions based on quiz type
  const getQuestions = () => {
    if (quizType === 'design') {
      return [
        // 30 design history questions from user
        {
          question: "What is the Bauhaus most famous for?",
          choices: [
            "Baroque architecture",
            "Integrating art, craft, and technology in a functional, minimalist philosophy",
            "Victorian patterns",
            "Pop art"
          ],
          correct: 1,
          tags: ["Bauhaus", "Modernism", "Design History"],
          answerDetail: "The Bauhaus revolutionized design by focusing on functionality, simplicity, and merging form with function, laying the groundwork for modernism."
        },
        {
          question: "Which statement best describes a primary goal of the Bauhaus school?",
          choices: [
            "Preserve royal traditions",
            "Blur boundaries between fine art, craft, and industrial design",
            "Promote Gothic Revival",
            "Reject technology"
          ],
          correct: 1,
          tags: ["Bauhaus", "Design Philosophy"],
          answerDetail: "The Bauhaus aimed to eliminate distinctions between artisan and artist, focusing on collective, interdisciplinary design solutions."
        },
        {
          question: "Which designer was NOT associated with the Bauhaus school?",
          choices: [
            "Walter Gropius",
            "Marcel Breuer",
            "Ludwig Mies van der Rohe",
            "Philippe Starck"
          ],
          correct: 3,
          tags: ["Bauhaus", "People"],
          answerDetail: "Starck is a postmodern designer, while the others were founders or teachers at Bauhaus."
        },
        {
          question: "Which iconic piece of furniture was designed by Marcel Breuer at the Bauhaus?",
          choices: [
            "LC2 Sofa",
            "Wassily Chair",
            "Eames Lounge Chair",
            "Barcelona Chair"
          ],
          correct: 1,
          tags: ["Bauhaus", "Iconic Design", "Furniture"],
          answerDetail: "Breuer's Wassily Chair, made of tubular steel, became a Bauhaus and modernism symbol."
        },
        {
          question: "Who is considered the \"father of Swiss Design/International Typographic Style\"?",
          choices: [
            "Max Bill",
            "Paul Rand",
            "Josef Müller-Brockmann",
            "Dieter Rams"
          ],
          correct: 2,
          tags: ["Swiss Design", "Typography", "Modernism"],
          answerDetail: "Müller-Brockmann formalized grid-based design and visual clarity that influenced modern digital design paradigms."
        },
        {
          question: "The Bauhaus was closed by which regime in 1933?",
          choices: [
            "Soviet Union",
            "Nazi Party",
            "United States government",
            "French government"
          ],
          correct: 1,
          tags: ["Bauhaus", "Politics", "History"],
          answerDetail: "The Nazis saw Bauhaus ideals as subversive, forcing closure; its faculty later spread Bauhaus influence globally."
        },
        {
          question: "Which of these is a core Bauhaus mantra?",
          choices: [
            "More is More",
            "Form follows function",
            "Complexity is king",
            "Baroque for the future"
          ],
          correct: 1,
          tags: ["Bauhaus", "Modernism", "Philosophy"],
          answerDetail: "Form follows function summarizes the Bauhaus focus on utility and simplicity over unnecessary decoration."
        },
        {
          question: "Which post-war German company did Dieter Rams shape with his design work from the 1950s onward?",
          choices: [
            "Apple",
            "Braun",
            "Sony",
            "IKEA"
          ],
          correct: 1,
          tags: ["Dieter Rams", "Industrial Design"],
          answerDetail: "Rams made Braun an icon of functional, minimalist product design."
        },
        {
          question: "Dieter Rams' Ten Principles for Good Design most strongly advocate for:",
          choices: [
            "Ornament",
            "Timelessness, simplicity, honesty, and environmental responsibility",
            "Short product life",
            "Fringe trends"
          ],
          correct: 1,
          tags: ["Dieter Rams", "Design Principles"],
          answerDetail: "Rams' rules champion usability, clarity, sustainability, and restraint—pillars of contemporary design."
        },
        {
          question: "Which Apple designer was most directly influenced by Dieter Rams?",
          choices: [
            "Tony Fadell",
            "Jony Ive",
            "Steve Jobs",
            "Susan Kare"
          ],
          correct: 1,
          tags: ["Jony Ive", "Apple", "Dieter Rams"],
          answerDetail: "Jony Ive openly cites Rams as the strongest influence on his minimalist product philosophy at Apple."
        },
        {
          question: "Which product line at Braun was especially influential in Jony Ive's designs for Apple?",
          choices: [
            "Kitchen appliances",
            "Audio equipment and calculators",
            "Televisions",
            "Automobiles"
          ],
          correct: 1,
          tags: ["Braun", "Jony Ive", "Design Influence"],
          answerDetail: "Braun's audio devices and calculators were echoed in Apple's iPods and iPhones."
        },
        {
          question: "Which Rams principle is most evident in the iPod's iconic scroll wheel and minimalist interface?",
          choices: [
            "Design is ornamental",
            "Good design is as little design as possible",
            "Design denies functionality",
            "Good design is complex"
          ],
          correct: 1,
          tags: ["Dieter Rams", "Apple", "Minimalism"],
          answerDetail: "This principle—\"so wenig design wie möglich\"—inspires the iPod's elegant simplicity."
        },
        {
          question: "What notable feature ties the Bauhaus, Rams, and Apple design philosophies together?",
          choices: [
            "Baroque excess",
            "Simplicity, clarity, and functionality",
            "Postmodern clutter",
            "Use of gold ornament"
          ],
          correct: 1,
          tags: ["Bauhaus", "Dieter Rams", "Ive", "Modernism"],
          answerDetail: "All three pursue clear function, honest materials, and beauty through utility."
        },
        {
          question: "Which Apple product line did Jony Ive NOT design?",
          choices: [
            "iPod",
            "iPhone",
            "Macintosh Classic",
            "Apple Watch"
          ],
          correct: 2,
          tags: ["Apple", "Jony Ive", "Product Design"],
          answerDetail: "Jony Ive joined Apple after the release of the early Macintosh computers."
        },
        {
          question: "Who designed the original Macintosh graphical user interface (GUI) icons and fonts?",
          choices: [
            "Jony Ive",
            "Dieter Rams",
            "Susan Kare",
            "Marcel Breuer"
          ],
          correct: 2,
          tags: ["Apple", "GUI", "Iconography"],
          answerDetail: "Susan Kare's pixel-perfect icons set the tone for decades of digital visual style."
        },
        {
          question: "Who said \"Design is not just what it looks like and feels like. Design is how it works\"?",
          choices: [
            "Walter Gropius",
            "Steve Jobs",
            "Massimo Vignelli",
            "Jony Ive"
          ],
          correct: 1,
          tags: ["Steve Jobs", "Apple", "Design Thinking"],
          answerDetail: "Steve Jobs captured the Bauhaus and Rams spirit, emphasizing holistic, user-centered design."
        },
        {
          question: "Which design movement emphasized \"Reduce, Reuse, Recycle\" and sustainability in the late 20th/21st century?",
          choices: [
            "Brutalism",
            "Green Design/Ecodesign",
            "Rococo",
            "Bauhaus"
          ],
          correct: 1,
          tags: ["Sustainability", "Green Design"],
          answerDetail: "Ecodesign stresses minimizing waste and environmental impact."
        },
        {
          question: "Who is known for the \"Less, but better\" design philosophy?",
          choices: [
            "Dieter Rams",
            "Philippe Starck",
            "David Carson",
            "Le Corbusier"
          ],
          correct: 0,
          tags: ["Dieter Rams", "Minimalism"],
          answerDetail: "Rams' mantra underpins his enduring influence on product design."
        },
        {
          question: "The \"International Style\" in architecture, like Bauhaus, is known for:",
          choices: [
            "Asymmetry, flat roofs, no ornament",
            "Gothic arches",
            "Exposed brickwork",
            "Neo-classical columns"
          ],
          correct: 0,
          tags: ["International Style", "Bauhaus", "Architecture"],
          answerDetail: "Clean lines and unornamented surfaces defined the global modernist aesthetic."
        },
        {
          question: "Which 20th century designer championed \"Design for All\" and universal accessibility?",
          choices: [
            "Dieter Rams",
            "Otl Aicher",
            "Ron Mace",
            "Charles Eames"
          ],
          correct: 2,
          tags: ["Universal Design", "Accessibility"],
          answerDetail: "Ron Mace coined \"universal design,\" advancing inclusion in the built environment and products."
        },
        {
          question: "Which \"Good Design\" exhibition at MoMA (New York) popularized American modernist ideas in the 1950s?",
          choices: [
            "Good Design Exhibition",
            "De Stijl",
            "100 Chairs in 100 Days",
            "Bauhaus Retrospective"
          ],
          correct: 0,
          tags: ["MoMA", "Modernism", "Design History"],
          answerDetail: "MoMA's \"Good Design\" series educated American consumers about modern functional aesthetics."
        },
        {
          question: "Charles and Ray Eames are most famous for:",
          choices: [
            "Victorian wallpaper",
            "Iconic molded plywood furniture and films",
            "Pop art posters",
            "Large-scale painting"
          ],
          correct: 1,
          tags: ["Eames", "Mid-century Modern", "Furniture"],
          answerDetail: "Their innovative chairs and multimedia shaped the \"good life\" ideal of postwar design."
        },
        {
          question: "Who designed the \"LC2\" Chair, a classic work of modernist furniture?",
          choices: [
            "Marcel Breuer",
            "Le Corbusier",
            "Ettore Sottsass",
            "Paul Rand"
          ],
          correct: 1,
          tags: ["Modernism", "Furniture", "Le Corbusier"],
          answerDetail: "Le Corbusier's LC2 remains an icon of Industrial Age comfort and aesthetic clarity."
        },
        {
          question: "Who designed the iconic \"Moka Express\" espresso maker still in use today?",
          choices: [
            "Bruno Munari",
            "Richard Sapper",
            "Alfonso Bialetti",
            "Dieter Rams"
          ],
          correct: 2,
          tags: ["Industrial Design", "Classics"],
          answerDetail: "Bialetti's Moka has defined at-home coffee preparation since the 1930s."
        },
        {
          question: "What movement is associated with playful, Memphis-style, geometric postmodern design?",
          choices: [
            "Bauhaus",
            "International Style",
            "Memphis Group",
            "De Stijl"
          ],
          correct: 2,
          tags: ["Postmodern", "Memphis Group"],
          answerDetail: "Founded in 1981 by Ettore Sottsass, the Memphis Group reacted against modernist restraint."
        },
        {
          question: "Which designer created the New York Subway map and ESPN's \"SportsCenter\" graphics system?",
          choices: [
            "Massimo Vignelli",
            "Paul Rand",
            "Saul Bass",
            "Alan Fletcher"
          ],
          correct: 0,
          tags: ["Graphics", "Vignelli", "Systems Design"],
          answerDetail: "Vignelli's logic-driven maps became models for transit and information clarity."
        },
        {
          question: "What did Paul Rand design that remains iconic in branding?",
          choices: [
            "IBM, ABC, and UPS logos",
            "Mont Blanc pens",
            "NASA spacesuits",
            "MoMA's typeface"
          ],
          correct: 0,
          tags: ["Branding", "Paul Rand"],
          answerDetail: "Rand's logos are simple, memorable, and enduring examples of corporate branding."
        },
        {
          question: "Which of the following is NOT a key principle in Rams' design approach?",
          choices: [
            "Innovative",
            "Makes a product useful",
            "Obtrusive",
            "Environmentally friendly"
          ],
          correct: 2,
          tags: ["Rams", "Design Principles"],
          answerDetail: "Good design should be unobtrusive, according to Rams."
        },
        {
          question: "Which school or movement most influenced IKEA's flat-pack furniture design?",
          choices: [
            "Bauhaus",
            "Art Nouveau",
            "Rococo",
            "Baroque"
          ],
          correct: 0,
          tags: ["Bauhaus", "IKEA", "Industrial Design"],
          answerDetail: "IKEA's designs leverage Bauhaus principles: functionality, affordability, simplicity, and mass production."
        },
        {
          question: "Who brought Scandinavian Design to global prominence in the 20th century?",
          choices: [
            "Alvar Aalto",
            "Philippe Starck",
            "Zaha Hadid",
            "Jasper Morrison"
          ],
          correct: 0,
          tags: ["Scandinavian Design", "Alvar Aalto"],
          answerDetail: "Aalto's humanist, accessible modernism shaped how the world sees \"Scandinavian style.\""
        },
        {
          question: "Who famously designed the \"Anglepoise\" lamp with a constant-tension spring?",
          choices: [
            "Jony Ive",
            "Dieter Rams",
            "George Carwardine",
            "Marcel Breuer"
          ],
          correct: 2,
          tags: ["Industrial Design", "Lighting"],
          answerDetail: "Carwardine's engineering solution created a desk lamp icon copied worldwide."
        },
        {
          question: "Who fused pop art and design in the 1960s with colorful, surreal furniture and interiors?",
          choices: [
            "Gaetano Pesce",
            "Andy Warhol",
            "Philippe Starck",
            "Ettore Sottsass"
          ],
          correct: 0,
          tags: ["Pop Art", "Design", "Pesce"],
          answerDetail: "Gaetano Pesce is known for playful, unconventional work blurring art and design boundaries."
        },
        {
          question: "What did Otl Aicher design for the 1972 Munich Olympics that remained influential?",
          choices: [
            "Olympic torch",
            "Pictogram signage system and color-coded graphics",
            "Architecture",
            "Mascot only"
          ],
          correct: 1,
          tags: ["Graphic Design", "Olympics", "Otl Aicher"],
          answerDetail: "Aicher's pictogram set (stick-figure icons) created the template for modern visual information."
        },
        {
          question: "Who is known for witty, \"postmodern\" graphic design covers for The New York Times and Eye magazine?",
          choices: [
            "Milton Glaser",
            "David Carson",
            "Paula Scher",
            "Neville Brody"
          ],
          correct: 1,
          tags: ["Graphic Design", "Postmodern", "Magazines"],
          answerDetail: "Carson rejected grid discipline, bringing expressive chaos to type and layout."
        },
        {
          question: "What is Susan Kare known for, beyond Apple icons?",
          choices: [
            "Early digital emoji, typefaces, and game graphics",
            "Memphis furniture",
            "IKEA kitchens",
            "Olympic logos"
          ],
          correct: 0,
          tags: ["Digital Design", "Icons", "Kare"],
          answerDetail: "Kare's bitmap icons appeared in early Apple, Microsoft, and other UI history milestones."
        },
        // --- BEGIN ADVANCED UI/UX QUESTIONS ---
        {
          question: "According to WCAG and mobile best practices, what is the minimum recommended size for tap targets (such as buttons) on touchscreens?",
          choices: [
            "16x16 pixels",
            "24x24 pixels",
            "44x44 pixels",
            "60x60 pixels"
          ],
          correct: 2,
          tags: ["Button Size", "Tap Target", "Accessibility"],
          answerDetail: "44x44 px (or ~9mm square) ensures that most users can accurately target buttons with a finger, reducing errors and frustration."
        },
        {
          question: "If multiple controls are placed too close together on a mobile UI, what key usability issue can result?",
          choices: [
            "Faster interactions",
            "Decreased cognitive load",
            "Increased risk of accidental taps and errors",
            "Improved scrolling"
          ],
          correct: 2,
          tags: ["Spacing", "Mobile", "Errors"],
          answerDetail: "Users may tap the wrong control; adequate spacing prevents 'fat-finger' errors and supports accessibility."
        },
        {
          question: "What is the primary benefit of providing visual feedback (such as color change or animation) on button press?",
          choices: [
            "Purely aesthetic improvement",
            "Confusion for the user",
            "Confirms to the user that the action has been acknowledged and is processing",
            "Slower performance"
          ],
          correct: 2,
          tags: ["Microinteractions", "Feedback"],
          answerDetail: "Visual cues (e.g., button darkens or animates) reassure users their tap or click was registered, improving perceived responsiveness."
        },
        {
          question: "Which alignment is easiest to scan for lists of options in forms or menus?",
          choices: [
            "Center alignment",
            "Right alignment",
            "Left alignment (for LTR languages)",
            "Random alignment"
          ],
          correct: 2,
          tags: ["Lists", "Forms", "Readability"],
          answerDetail: "Left-aligning labels and inputs helps eyes to scan vertically and read faster in left-to-right scripts."
        },
        {
          question: "What font size is generally considered a bare minimum for body text readability on mobile web?",
          choices: [
            "8px",
            "10px",
            "16px",
            "22px"
          ],
          correct: 2,
          tags: ["Typography", "Accessibility"],
          answerDetail: "16px is widely recommended for body copy to ensure legibility without pinch-zoom."
        },
        {
          question: "How should error messages be displayed in forms for best usability?",
          choices: [
            "Only as pop-ups at the top of the page",
            "Immediately adjacent to the relevant field, with clear, specific language",
            "In a hidden panel",
            "Just as numeric codes"
          ],
          correct: 1,
          tags: ["Error States", "Forms"],
          answerDetail: "Contextual, inline errors near the problematic field are easiest for users to identify and resolve."
        },
        {
          question: "Which button color usage generally improves primary action clarity?",
          choices: [
            "Using the same color as the rest of the UI",
            "Using a distinct, high-contrast color for the primary button",
            "Muted, low-contrast for all buttons",
            "Random cycling colors"
          ],
          correct: 1,
          tags: ["Buttons", "Visual Hierarchy"],
          answerDetail: "A strong, unique color for the primary action draws focus and guides user decisions."
        },
        {
          question: "What is the ideal line length (in characters) for optimal readability in paragraphs on desktop layouts?",
          choices: [
            "30–40",
            "60–75",
            "100–120",
            "Any length works"
          ],
          correct: 1,
          tags: ["Readability", "Typography"],
          answerDetail: "60–75 characters per line keeps reading comfortable; longer lines make it hard to track, shorter lines interrupt flow."
        },
        {
          question: "Why should placeholder text *not* be used as a substitute for form input labels?",
          choices: [
            "Placeholder text is always visible",
            "Placeholder text disappears when typing, making it easy to forget or misinterpret the field's purpose",
            "Screen readers always interpret placeholder text",
            "Placeholders can't use color"
          ],
          correct: 1,
          tags: ["Forms", "Accessibility"],
          answerDetail: "Clear, persistent labels are essential; always use labels for clarity and accessibility."
        },
        {
          question: "To support keyboard-only navigation, interactive elements on web UIs must be:",
          choices: [
            "Deactivated",
            "Focusable in logical tab order and have visible focus states",
            "Hidden from view",
            "Red and blue only"
          ],
          correct: 1,
          tags: ["Accessibility", "Keyboard"],
          answerDetail: "Logical tab order and a visible focus style (like a highlight) help keyboard or assistive tech users navigate."
        },
        {
          question: "Why is generous whitespace around buttons and controls important for UI design?",
          choices: [
            "It wastes screen real estate",
            "It creates visual separation, reduces mis-taps, and improves clarity and tap comfort",
            "It increases complexity",
            "It hides information"
          ],
          correct: 1,
          tags: ["Spacing", "Comfort"],
          answerDetail: "Whitespace is crucial for touch targets, visual focus, and easy scanning, not just visual appeal."
        },
        {
          question: "What is a \"disabled\" state for a button?",
          choices: [
            "Button is hidden completely",
            "Button is present but grayed out, not interactive, and typically signals unmet form requirements",
            "Button vibrates",
            "Button is larger than others"
          ],
          correct: 1,
          tags: ["Button States", "Feedback"],
          answerDetail: "Disabled states tell the user why an action isn't available and prevent errors."
        },
        {
          question: "Where on a dialog should the primary and secondary buttons ideally be placed for left-to-right users?",
          choices: [
            "Secondary on right, primary on left",
            "Both on left",
            "Secondary on left, primary on right",
            "Random order"
          ],
          correct: 2,
          tags: ["Dialogs", "Button Layout", "UX Conventions"],
          answerDetail: "Primary-on-right mirrors reading direction and expectations in LTR cultures (reverse for RTL languages)."
        },
        {
          question: "How can designers support rapid, error-proof data entry on desktop forms?",
          choices: [
            "Group related fields, logical tab order, and auto-advance between fields",
            "Merge every field into one",
            "Require only mouse input",
            "Use only drop-downs"
          ],
          correct: 0,
          tags: ["Forms", "Data Entry"],
          answerDetail: "Grouping, tab order, and auto-advance speed up task flows and reduce mistakes."
        },
        {
          question: "What is the role of a \"snackbar\" or toast notification in interaction design?",
          choices: [
            "Permanent, always-visible alert",
            "Temporary feedback for actions like saving changes or undo, typically non-blocking",
            "Full-page popup",
            "Deletes user data"
          ],
          correct: 1,
          tags: ["Notifications", "Feedback"],
          answerDetail: "Snackbars offer brief, clear feedback without blocking further user input."
        },
        {
          question: "A micro-interaction (e.g., animated \"like\" on tap) supports what main UX principle?",
          choices: [
            "Data storage",
            "System feedback and emotional engagement",
            "Slower site load",
            "Prevents navigation"
          ],
          correct: 1,
          tags: ["Microinteractions", "Feedback"],
          answerDetail: "Small responses to user actions reinforce cause/effect, add delight, and reassure users."
        },
        {
          question: "What's the best method for visually indicating a currently active state in a navigation bar?",
          choices: [
            "No change",
            "Use a clear highlight (underline, change of color, or background)",
            "Make all items bold",
            "Hide inactive items"
          ],
          correct: 1,
          tags: ["Navigation", "Active State"],
          answerDetail: "Highlighting keeps users oriented and signals current location."
        },
        {
          question: "Which pattern helps users avoid entering redundant data (e.g., address, email) in multi-step forms?",
          choices: [
            "Ignore previous steps",
            "Offer autofill suggestions or \"Same as above\" checkboxes",
            "Only ask for it twice",
            "Hide submission"
          ],
          correct: 1,
          tags: ["Forms", "Usability"],
          answerDetail: "Autofill and 'Same as...' reduce friction and speed up form completion."
        },
        {
          question: "In a table, how should you display a long, text-heavy cell without sacrificing layout?",
          choices: [
            "Truncate and offer a tooltip or \"read more\" expand",
            "Overflow text into next cell",
            "Hide the entire row",
            "Use a color gradient"
          ],
          correct: 0,
          tags: ["Tables", "Responsive"],
          answerDetail: "Truncation with hover/click expansion balances information density and readability."
        },
        {
          question: "When displaying \"required\" fields in a long form, what supports user comprehension?",
          choices: [
            "Mark only the first field",
            "Mark all required fields with clear asterisks and a global explanation",
            "Use random colors",
            "Hide all required field indicators"
          ],
          correct: 1,
          tags: ["Forms", "Required Fields"],
          answerDetail: "Asterisks + a legend (* = Required) help users plan completion and minimize errors."
        },
        {
          question: "For sliders/controllers (e.g., volume or price range), what's one best practice?",
          choices: [
            "No visible value",
            "Show the current value numerically in addition to position",
            "Only display the background",
            "Add random animations"
          ],
          correct: 1,
          tags: ["Sliders", "Input"],
          answerDetail: "Pairing the slider with a precise value eliminates guesswork and supports accessibility."
        },
        {
          question: "For long content on mobile, what navigation aid is most helpful?",
          choices: [
            "Hide navigation",
            "Sticky navigation bar or back-to-top button",
            "Block scrolling",
            "Remove hierarchy"
          ],
          correct: 1,
          tags: ["Mobile", "Navigation"],
          answerDetail: "Sticky nav/back-to-top maintains orientation and ease of use on lengthy pages."
        },
        {
          question: "Progress indicators improve:",
          choices: [
            "Only loading speed",
            "User confidence, clarity, and perceived speed for multi-step processes",
            "Design complexity",
            "Error frequency"
          ],
          correct: 1,
          tags: ["Progress Indication", "Usability"],
          answerDetail: "Progress bars or steps help manage expectations and boost completion rates."
        },
        {
          question: "Checkboxes are best used for:",
          choices: [
            "Single selection from a list",
            "Multiple independent choices",
            "Navigation only",
            "Real-time search"
          ],
          correct: 1,
          tags: ["Inputs", "Forms"],
          answerDetail: "Checkboxes allow multiple selections, while radio buttons are for mutually exclusive options."
        },
        {
          question: "What is the default tab order for forms and controls in web accessibility?",
          choices: [
            "By color",
            "Document source order (DOM order)",
            "Alphabetical",
            "Visual position only"
          ],
          correct: 1,
          tags: ["Accessibility", "Keyboard"],
          answerDetail: "Tab navigation follows the source-code order unless otherwise manipulated."
        },
        {
          question: "To maximize scannability in a card-based UI (e.g., product grid), what's important?",
          choices: [
            "Uniform card sizes, aligned images/text, clear spacing",
            "Mixed card sizes, no margin",
            "Random text colors",
            "No titles"
          ],
          correct: 0,
          tags: ["Cards", "Visual Hierarchy"],
          answerDetail: "Uniformity lets eyes scan in predictable rows/columns and compare information swiftly."
        },
        {
          question: "What is a \"hover state\" and where is it most useful?",
          choices: [
            "Touchscreen only",
            "A visual effect on UI element mouse-over, most useful for desktop tooltips/feedback",
            "On printed forms",
            "For mobile navigation"
          ],
          correct: 1,
          tags: ["States", "UI Feedback"],
          answerDetail: "Mouse-over feedback (e.g., highlight, tooltip) supports discovery and clarity on desktop."
        },
        {
          question: "When should icon-only buttons *not* be used?",
          choices: [
            "For universally recognizable actions (like search or close)",
            "When the icon's meaning may not be clear without a label",
            "For repeated actions",
            "When branding is required"
          ],
          correct: 1,
          tags: ["Icons", "Usability"],
          answerDetail: "Ambiguous icons need accompanying labels to be accessible and usable."
        },
        {
          question: "Which button placement is best for \"Call to Action\" on long-scrolling mobile pages?",
          choices: [
            "Only at the top",
            "Fixed/sticky at the bottom of the viewport",
            "In the footer only",
            "Behind a menu"
          ],
          correct: 1,
          tags: ["CTA", "Mobile UI"],
          answerDetail: "Sticky bottom CTAs are always handy, reducing scrolling and increasing conversion rates."
        },
        {
          question: "What is an effective way to visually differentiate destructive (dangerous) actions from primary/secondary actions?",
          choices: [
            "Use the same color for all",
            "Red color combined with clear labeling and spacing",
            "Emphasize with animation",
            "Hide them"
          ],
          correct: 1,
          tags: ["Destructive Actions", "Buttons"],
          answerDetail: "Red color, clear wording (\"Delete\"), and spacing helps prevent mistakes and signal risk."
        },
        // --- END ADVANCED UI/UX QUESTIONS ---
        // --- BEGIN DESIGN COMMON SENSE AND UI/UX BEST PRACTICES QUESTIONS ---
        {
          question: "Which action helps avoid 'choice overload' in ecommerce product filters?",
          choices: [
            "Show all possible filters by default",
            "Prioritize common filters and group advanced options under 'More filters'",
            "Hide all filters",
            "Only allow one filter"
          ],
          correct: 1,
          answerDetail: "Too many visible options overwhelm users. Show the most relevant and give access to others when needed."
        },
        {
          question: "To minimize friction on a login page, what's the best initial approach?",
          choices: [
            "Require multi-step authentication right away",
            "Offer clear error feedback and let users see or reveal passwords",
            "Hide forgotten password link",
            "Use only icons"
          ],
          correct: 1,
          answerDetail: "Reducing login errors and offering visual support leads to higher completion rates and less frustration."
        },
        {
          question: "What is the most intuitive position for main navigation on a desktop website?",
          choices: [
            "Top or left side",
            "Footer only",
            "Hidden",
            "Floating"
          ],
          correct: 0,
          answerDetail: "Users expect global nav on top or left, maximizing discoverability and orientation."
        },
        // --- END DESIGN COMMON SENSE AND UI/UX BEST PRACTICES QUESTIONS ---
        // --- BEGIN VERY HARD UX DESIGN QUESTIONS ---
        {
          question: "Which measurement technique best captures 'cognitive workload' in real-time usability studies?",
          choices: [
            "Likert-scale post-task surveys",
            "Task completion time",
            "Dual-task methodology (secondary-task interference, e.g., reciting numbers while using interface)",
            "Click-through rate"
          ],
          correct: 2,
          tags: ["Cognitive Load", "Measurement", "Research Methods"],
          answerDetail: "Dual-task methodology can objectively measure how much of a user's cognitive resources an interface consumes, by seeing how secondary-task performance drops when cognitive load is high."
        },
        {
          question: "In Fitts's Law, which design scenario would result in the *highest* index of difficulty for a target?",
          choices: [
            "Large button, close to starting position",
            "Small button, far from starting position",
            "Large button, far from starting position",
            "Small button, close to starting position"
          ],
          correct: 1,
          tags: ["UI Theory", "Fitts's Law"],
          answerDetail: "Small, distant targets require more precision and effort, maximizing 'index of difficulty' and increasing interaction time/errors."
        },
        {
          question: "Which advanced research method uncovers not only whether, but *how* and *why* users make navigation errors in a prototype?",
          choices: [
            "Pure A/B multivariate testing",
            "Retrospective think-aloud using video replay",
            "Single-path analytics",
            "Focus group only"
          ],
          correct: 1,
          tags: ["Methods", "Qualitative Research"],
          answerDetail: "Retrospective think-aloud, especially with replay, reveals users' actual paths, misconceptions, and decision strategies."
        },
        {
          question: "Which Nielsen heuristic is most directly violated if an application's error message provides no details or suggestions for resolution?",
          choices: [
            "Visibility of system status",
            "User control and freedom",
            "Help users recognize, diagnose, and recover from errors",
            "Consistency"
          ],
          correct: 2,
          tags: ["Heuristics", "Error Recovery"],
          answerDetail: "Error messages must explain what happened, why, and how to fix it—crucial for self-service recovery."
        },
        {
          question: "If eye-tracking heatmaps reveal fixations on a non-interactive decorative image, what risk occurs?",
          choices: [
            "Enhanced findability",
            "Unintentional distraction, drawing attention away from core actions ('false affordance')",
            "Improved conversion",
            "Accessibility benefit"
          ],
          correct: 1,
          tags: ["Eye Tracking", "Affordance"],
          answerDetail: "Users may interpret the image as clickable or important, diverting attention from core tasks or conversions."
        },
        {
          question: "What advanced factor explains why users may abandon a wizard-style, multi-step process when required to recall complex, previously entered data?",
          choices: [
            "Aesthetic-usability effect",
            "Recognition rather than recall",
            "Peak-end rule",
            "Grid alignment"
          ],
          correct: 1,
          tags: ["Memory", "Heuristics", "Process Design"],
          answerDetail: "Whenever possible, interfaces should support recognition—not require recall from memory—especially for critical workflows."
        },
        {
          question: "Which accessibility technique best supports users with low vision in dense data tables?",
          choices: [
            "Hover-based tooltips",
            "High contrast rows, thick grid lines, and ARIA summary descriptions",
            "Pure color coding",
            "Fixed small font"
          ],
          correct: 1,
          tags: ["Accessibility", "Tables"],
          answerDetail: "High contrast, clear visual structure, and assistive software-read summaries make complex data more perceivable and navigable."
        },
        {
          question: "A product team chooses to 'minimize friction' to reduce task time. Which tradeoff *may* occur if friction is removed indiscriminately?",
          choices: [
            "Decreased abandonment",
            "Increased user satisfaction without drawbacks",
            "Increased risk of careless or accidental actions, especially for destructive flows",
            "Improved onboarding only"
          ],
          correct: 2,
          tags: ["Friction", "Caution", "Tradeoffs"],
          answerDetail: "Not all friction is bad—confirmation steps and pauses guard against costly mistakes, especially with destructive actions."
        },
        {
          question: "A SaaS dashboard uses a color palette with blue and orange hues to represent opposing statuses. What color theory risk must the designer especially consider?",
          choices: [
            "Blue-orange is always accessible by default",
            "Users with tritanopia (blue-yellow color blindness) may not distinguish these hues",
            "All users will prefer the blue",
            "Orange is always attention-getting"
          ],
          correct: 1,
          tags: ["Color Theory", "Accessibility"],
          answerDetail: "Tritanopia makes blue/yellow (and some oranges) hard to distinguish; icons/patterns should supplement color cues."
        },
        {
          question: "Which scenario showcases a 'contextual inquiry' at its most advanced?",
          choices: [
            "Lab-based usability test",
            "Analytics review",
            "Observing a nurse using a hospital EMR during an actual shift, followed by in-situ interview",
            "Customer satisfaction survey"
          ],
          correct: 2,
          tags: ["Methods", "Contextual Inquiry"],
          answerDetail: "True contextual inquiry analyzes behavior within the authentic environment, not a lab."
        },
        {
          question: "Why are progressive disclosure patterns challenging in multi-lingual interfaces?",
          choices: [
            "All languages use the same amount of text",
            "Conditional content can expand/shrink dramatically across locales, breaking layout and logic",
            "English is always shortest",
            "Only icons are used"
          ],
          correct: 1,
          tags: ["Localization", "Progressive Disclosure"],
          answerDetail: "German, for example, can be ~30% longer than English; overflow or truncation can break progressive dialogs and accordions."
        },
        {
          question: "What is a primary risk of using parallax scrolling effects for key content areas?",
          choices: [
            "Always increases engagement",
            "Can cause motion sickness, disables scroll-predictability, and impairs assistive technology",
            "Reduces load time",
            "Standardizes navigation"
          ],
          correct: 1,
          tags: ["Interaction Design", "Accessibility"],
          answerDetail: "Parallax can break spatial logic and is a well-known accessibility and usability risk for many users."
        },
        {
          question: "Which method allows designers to quantify the 'learnability' of an interface over repeated use?",
          choices: [
            "Task completion rate on first use only",
            "SUS score once",
            "Observing error rates and task times across multiple, spaced test sessions",
            "Heatmaps"
          ],
          correct: 2,
          tags: ["Research", "Learnability"],
          answerDetail: "Tracking improvements over repeated attempts quantifies how fast users build proficiency—key to understanding true learnability."
        },
        {
          question: "If an app disables navigation and overlays a spinner for long operations, what advanced risk is created for assistive tech users?",
          choices: [
            "Accessibility is improved",
            "Spinner may not be announced, trapping screen reader users with no feedback or way to escape",
            "Increases page speed",
            "Always shows loading message"
          ],
          correct: 1,
          tags: ["Accessibility", "Loading States"],
          answerDetail: "Focus and system status must be announced; otherwise, screen reader users are stuck, confused, or forced to quit."
        },
        {
          question: "Which advanced usability testing protocol focuses on the *emotional effect* of a UI as well as task success?",
          choices: [
            "co-discovery",
            "RITE method",
            "Desirability studies using product reaction cards",
            "Pure quantitative analysis"
          ],
          correct: 2,
          tags: ["Usability Testing", "Emotional UX"],
          answerDetail: "Desirability studies (like product reaction cards with adjectives) measure subconscious and affective responses, not just task outcome."
        },
        {
          question: "What is the critical distinction between a service blueprint and a process flow diagram in UX?",
          choices: [
            "Both show only user tasks",
            "Blueprints map frontstage (user-experience) AND backstage (support, tech) touchpoints",
            "Process flows always include emotion",
            "Blueprints do not show time"
          ],
          correct: 1,
          tags: ["Service Design", "Mapping"],
          answerDetail: "Blueprints visualize the whole delivery—what the user sees and what supports them, unlike mere flows."
        },
        {
          question: "Which quantitative method can reveal the *relative* priority of competing user needs for roadmap planning?",
          choices: [
            "Open card sorting",
            "Kano Model analysis",
            "Qualitative interviews",
            "Competitive benchmarking"
          ],
          correct: 1,
          tags: ["Research", "Prioritization"],
          answerDetail: "Kano Model surveys classify features as must-haves, delighters, or indifferents, informing investment priorities."
        },
        {
          question: "If you observe high task failure on a tree-testing exercise, which insight does this most directly suggest?",
          choices: [
            "Card sort was done wrong",
            "Core information architecture (structure or labeling) is not aligned with user mental models",
            "Page is too colorful",
            "Users are lazy"
          ],
          correct: 1,
          tags: ["IA", "Validation"],
          answerDetail: "Tree testing tests findability and structure; repeated failures signal a mismatch between what the user expects and the site's organization."
        },
        {
          question: "A design team relies on customer support tickets for UX research. What crucial bias must be considered?",
          choices: [
            "Representative sampling",
            "Recency bias",
            "Self-selection bias: only highly motivated or frustrated users report issues",
            "Aesthetic-usability effect"
          ],
          correct: 2,
          tags: ["Research", "Bias"],
          answerDetail: "Support tickets skew toward edge cases or advanced problems—quiet users' struggles may be missed entirely."
        },
        {
          question: "Which advanced animation property is most disruptive for users with vestibular disorders?",
          choices: [
            "Fast opacity fade-in",
            "Small color changes",
            "Large-scale, fast directional movement (parallax, panning, zooming)",
            "Subtle box-shadow"
          ],
          correct: 2,
          tags: ["Animation", "Accessibility"],
          answerDetail: "Fast, motion-heavy effects can trigger vertigo or nausea for sensitive users. Always offer a 'reduce motion' setting."
        },
        {
          question: "Within quantitative UX benchmarking, what is the key advantage of using a counterbalanced, within-subjects test design?",
          choices: [
            "Cheaper",
            "Reduces learning/carryover effects and individual differences by changing task order for each participant",
            "No statistical value",
            "Only works for surveys"
          ],
          correct: 1,
          tags: ["Research Design", "Testing"],
          answerDetail: "Counterbalancing makes sure results aren't due to practice effects, fatigue, or user-specific quirks."
        },
        {
          question: "Which advanced design anti-pattern can occur in 'clever' form validation that blocks submission before a user is ready?",
          choices: [
            "Just-in-time validation",
            "Premature validation (validating before user completes the field, leading to user confusion/frustration)",
            "Disabled submit button",
            "Pop-up modals"
          ],
          correct: 1,
          tags: ["Forms", "Errors", "Anti-patterns"],
          answerDetail: "Validating as soon as a field is selected or before intent is clear annoys users; validation should be triggered intelligently."
        },
        {
          question: "In accessibility audits, which contrasting color pair most often fails for the majority of color vision types, including those with achromatopsia?",
          choices: [
            "Black/white",
            "Green/red",
            "Blue/orange",
            "Dark gray/light gray"
          ],
          correct: 3,
          tags: ["Accessibility", "Color", "Auditing"],
          answerDetail: "Low-contrast schemes like dark gray/light gray present problems both for colorblind users and those with low vision."
        },
        {
          question: "Which UX law states 'users spend most of their time on other sites, so they prefer your site to work the same way as all the others'?",
          choices: [
            "Law of Prägnanz",
            "Tesler's Law",
            "Jakob's Law",
            "Zeigarnik Effect"
          ],
          correct: 2,
          tags: ["UX Laws", "Consistency"],
          answerDetail: "Jakob's Law underlines the importance of designing familiar patterns for fast learning and adoption."
        },
        {
          question: "In designing onboarding for complex systems, when is 'scaffolding' most appropriate, and what does it mean?",
          choices: [
            "Showing all functions upfront",
            "Gradually unveiling advanced features as user proficiency grows, supporting learning over time",
            "No guidance",
            "Only for experts"
          ],
          correct: 1,
          tags: ["Onboarding", "Scaffolding", "Learning"],
          answerDetail: "Scaffolding teaches users with progressive layers so they aren't overwhelmed, speeding confident adoption."
        },
        {
          question: "A designer wants to test both the icon meanings and the color contrast of buttons. Which research method(s) should be combined?",
          choices: [
            "First-impression testing AND accessibility contrast audits",
            "Tree testing",
            "Open card sorting",
            "Pure analytics"
          ],
          correct: 0,
          tags: ["Testing", "Accessibility", "Iconography"],
          answerDetail: "First impressions indicate recognizability; contrast audits guarantee visibility for all users."
        },
        {
          question: "Which dashboard design risk can emerge from excessive 'drill-down' and nested interactions?",
          choices: [
            "Flat navigation",
            "Discoverability and context loss, making users feel lost or 'buried'",
            "Improved page speed",
            "Better accessibility"
          ],
          correct: 1,
          tags: ["Navigation", "Complexity"],
          answerDetail: "Too many layers confuse users and reduce the sense of place—context breadcrumbs are essential."
        },
        {
          question: "If a checkout process allows for guest checkout but buries it under account creation prompts, what is the likely negative outcome?",
          choices: [
            "Improved sales",
            "Increased abandonment as users can't quickly find guest purchase",
            "Smoother flow",
            "Higher satisfaction"
          ],
          correct: 1,
          tags: ["eCommerce", "Conversion", "Usability"],
          answerDetail: "Forcing account creation is a top abandonment driver; guest checkout must be visible and easy."
        },
        {
          question: "Which emotional design framework prioritizes the visceral, behavioral, and reflective levels of user experience?",
          choices: [
            "Dual-coding theory",
            "Norman's Three Levels",
            "Activity Theory",
            "Fogg Behavior Model"
          ],
          correct: 1,
          tags: ["UX Psychology", "Norman", "Emotion"],
          answerDetail: "Don Norman describes visceral (appearance), behavioral (function), and reflective (meaning) user reactions."
        },
        {
          question: "A team is using journey maps, service blueprints, and experience flows, but key UX gaps persist. What critical mistake might they be making?",
          choices: [
            "Designing too quickly",
            "Failing to validate maps with real user data and iterative updates",
            "Testing with too many users",
            "Using color"
          ],
          correct: 1,
          tags: ["Research", "Mapping", "Validation"],
          answerDetail: "Maps reflect *assumptions* unless grounded by real user research; regular updating based on observation/testing is vital."
        }
        // --- END VERY HARD UX DESIGN QUESTIONS ---
      ];
    } else {
      return [
        {
          question: "Which color is complementary to red?",
          choices: [
            "Blue",
            "Green",
            "Yellow",
            "Cyan"
          ],
          correct: 1,
          tags: ["Color Theory", "Complementary Colors"]
        },
        {
          question: "What color scheme uses three colors equally spaced on the color wheel?",
          choices: [
            "Monochromatic",
            "Analogous",
            "Triadic",
            "Split-complementary"
          ],
          correct: 2,
          tags: ["Color Theory", "Color Schemes"]
        },
        {
          question: "Which color represents trust and stability?",
          choices: [
            "Red",
            "Blue",
            "Green",
            "Yellow"
          ],
          correct: 1,
          tags: ["Color Psychology", "Branding"]
        },
        {
          question: "What is the RGB value for pure white?",
          choices: [
            "0,0,0",
            "255,255,255",
            "128,128,128",
            "100,100,100"
          ],
          correct: 1,
          tags: ["Color Theory", "RGB"]
        },
        {
          question: "Which color temperature is considered warm?",
          choices: [
            "Blue",
            "Green",
            "Red",
            "Purple"
          ],
          correct: 2,
          tags: ["Color Theory", "Color Temperature"]
        }
      ];
    }
  };

  // Shuffle function
  function shuffle(array) {
    const shuffled = [...array];
    let currentIndex = shuffled.length, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [shuffled[currentIndex], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[currentIndex]];
    }
    return shuffled;
  }

  // On mount, shuffle questions
  useEffect(() => {
    if (quizType && timeLimit) {
      const qs = getQuestions();
      const shuffled = shuffle(qs);
      setQuestions(shuffled);
      questionsRef.current = shuffled;
      setCurrentQuestionIndex(0);
      setAnsweredQuestions([]);
      setIsLoading(false);
    }
  }, [quizType, timeLimit]);

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !isLoading) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      finishQuiz();
    }
  }, [timeLeft, isLoading]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex) => {
    if (selectedAnswer !== null || isLoading) return; // Prevent multiple selections
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answerIndex === currentQuestion.correct;
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
    setAnsweredQuestions(prev => [...prev, {
      questionIndex: currentQuestionIndex,
      selectedAnswer: answerIndex,
      isCorrect,
      tags: currentQuestion.tags,
      question: currentQuestion.question,
      choices: currentQuestion.choices,
      correct: currentQuestion.correct,
      answerDetail: currentQuestion.answerDetail
    }]);
    
    setTimeout(() => {
      // Only move to next question if time remains and there are unused questions
      if (timeLeft > 0) {
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(prev => prev + 1);
          setSelectedAnswer(null);
          setShowResult(false);
        } else {
          // If all questions are used, just stay on the last question until time runs out
          setSelectedAnswer(null);
          setShowResult(false);
        }
      }
    }, 2000);
  };

  const finishQuiz = () => {
    navigate('/summary', {
      state: {
        score,
        totalQuestions: questions.length,
        answeredQuestions,
        quizType,
        timeLimit,
        questions: questions // Pass the questions data for detailed view
      }
    });
  };

  const currentQuestion = questions[currentQuestionIndex] || undefined;
  const progressPercentage = ((totalTime - timeLeft) / totalTime) * 100;
  const isWarning = timeLeft <= totalTime * 0.3; // Warning when 30% time left
  const isDanger = timeLeft <= totalTime * 0.1; // Danger when 10% time left

  if (isLoading || !currentQuestion || !currentQuestion.choices) {
    return (
      <div className="page" style={{ background: '#ffffff', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: '18px', color: '#86868b' }}>Loading quiz...</div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-content">
        <div className="quiz-header">
          <div className="quiz-score">Score: {score}</div>
          <div className="quiz-timer">
            <div className="timer-text">{formatTime(timeLeft)}</div>
            <div className="timer-bar">
              <div 
                className={`timer-progress ${isDanger ? 'danger' : isWarning ? 'warning' : ''}`}
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="quiz-content">
          <div className="question">
            {currentQuestion.question}
          </div>

          <div className="tags">
            {currentQuestion.tags?.map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            ))}
          </div>

          <div className="choices-container">
            {currentQuestion.choices?.map((choice, index) => (
              <div
                key={index}
                className={`choice ${
                  showResult
                    ? index === currentQuestion.correct
                      ? 'correct'
                      : index === selectedAnswer && index !== currentQuestion.correct
                      ? 'incorrect'
                      : ''
                    : selectedAnswer === index
                    ? 'selected'
                    : ''
                }`}
                onClick={() => handleAnswerSelect(index)}
                style={{ cursor: selectedAnswer !== null ? 'default' : 'pointer' }}
              >
                {choice}
              </div>
            ))}
          </div>

          {showResult && (
            <div className="answer-detail-section" style={{
              marginTop: 32,
              background: '#f5f5f7',
              borderRadius: 16,
              padding: 24,
              textAlign: 'left',
              boxShadow: 'none',
              border: '1px solid #e5e5e7',
              maxWidth: 600,
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>
              <div style={{ fontWeight: 700, fontSize: 18, color: selectedAnswer === currentQuestion.correct ? '#34c759' : '#ff3b30', marginBottom: 8 }}>
                {selectedAnswer === currentQuestion.correct ? 'Correct!' : 'Incorrect'}
              </div>
              <div style={{ marginBottom: 8, color: '#1d1d1f', fontWeight: 500 }}>
                Correct Answer: {currentQuestion.choices[currentQuestion.correct]}
              </div>
              {currentQuestion.answerDetail && (
                <div style={{ color: '#86868b', fontSize: 15, marginTop: 8 }}>
                  <strong>Detail:</strong> {currentQuestion.answerDetail}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage; 