/* The capstone "module". Distinct from MODULES so HomeView treats it
   specially (full-width card, locked until totalDone === 6).
   Flow: Quiz + Reflect only. No Read tab — students have already done
   the reading across the 6 modules.
*/

export const CAPSTONE = {
  id: "capstone",
  title: "Check Out",
  sub: "I'm ready to be a dorm member",
  color: "#C7B4DB",
  token: "lilac",

  // No tips array — Read tab is hidden for capstone

  quiz: [
    { q: "Roommate playing loud music at 11pm — best response?", opts: ["Bang on the wall", "Calm chat — 'hey, can you turn it down?'", "Ignore it", "Post about them online"], a: 1 },
    { q: "Safe fridge temperature?", opts: ["Room temperature", "1-4°C", "Below freezing", "10°C"], a: 1 },
    { q: "Why turn dark clothes inside out before washing?", opts: ["Dries faster", "Preserves colour, prevents fading", "Aesthetic only", "To check pockets"], a: 1 },
    { q: "Leftovers can safely sit out for…", opts: ["8 hours", "2 hours max", "Overnight", "Until they smell"], a: 1 },
    { q: "Most hygienic dish-drying method?", opts: ["Towel dry immediately", "Air dry on rack", "Paper towels", "Leave in the sink"], a: 1 },
    { q: "What does 'everything has a home' mean?", opts: ["Get more storage", "Each item has a set place", "You own too much", "Decorate more"], a: 1 },
    { q: "Where should raw meat go in the fridge?", opts: ["Top shelf", "Bottom shelf, sealed", "Door", "Anywhere"], a: 1 },
    { q: "Find shared kitchen mess that's not yours — best move?", opts: ["Leave it forever", "Clean some + mention it kindly", "Bin their stuff", "Make a bigger mess"], a: 1 },
    { q: "Why rinse recyclables before binning?", opts: ["Looks tidy", "Food residue contaminates the batch", "Required by law", "Saves space"], a: 1 },
    { q: "Friends visit your dorm — your responsibility?", opts: ["No, they're guests", "Yes — for their behaviour and impact", "Only if RA notices", "Only if they break stuff"], a: 1 },
  ],

  reflect: {
    takeaway:     "What's the single most important thing you'll take from this training?",
    contribution: "What do you bring to the dorm beyond the basics? Think talents, hobbies, skills, character — what makes you, you?",
    commitment:   "What's your commitment to this dorm's culture — how will you show up?",
  },

  badge: "Dorm Member",
};
