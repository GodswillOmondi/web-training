1. Untyped state/context data is collapsing to {} and causing most downstream
   errors.
   In src/components/MemberProfile.tsx:8 and src/components/
   EventProfile.tsx:7, useState({}) infers {}. That is why every property
   access (name, status, date, etc.) fails. The same root issue exists in src/
   context/dataContext.tsx:3, where User is referenced but not defined/
   imported.
   Fix: introduce shared frontend types, e.g. User, Member, Event, probably in
   src/types.ts, then use useState<Member | null>(null), useState<Event |
   null>(null), and createContext<User | null>(null). Export User from src/
   hooks/useAuth.ts:4 or move it to the shared types file.
2. Route params are nullable, but you pass them to APIs that require string.
   In src/components/MemberProfile.tsx:31, src/components/
   MemberProfile.tsx:117, src/components/EventProfile.tsx:21, src/components/
   EventProfile.tsx:26, and src/components/EventProfile.tsx:110, useParams()
   returns string | undefined.
   Fix: destructure with typing and guard early:

   const { memberID } = useParams<{ memberID: string }>();
   if (!memberID) return <div>Member not found</div>;

   Same for eventID. Also src/components/EventProfile.tsx:110 uses eventID
   without defining it; it should come from const { eventID } =
   useParams<{ eventID: string }>().

3. Two useEffect calls have an invalid dependency argument.
   src/components/MemberProfile.tsx:41 and src/components/EventProfile.tsx:35
   pass {} instead of a dependency array.
   Fix: use [] or [memberID] / [eventID]. In these cases the param should be
   included:

   }, [memberID]);

4. RegistrationForm is spreading a union that is not guaranteed to be an
   object.
   src/components/RegistrationForm.tsx:97 does:

   ...prev[parent as keyof MemberData]

   but MemberData[keyof MemberData] includes string, so TS rejects the spread.
   Fix: narrow parent to only nested object keys:

   type NestedKey = "address" | "emergencyContact";
   const [parent, child] = name.split(".") as [NestedKey, string];
   setMemberData(prev => ({
   ...prev,
   [parent]: {
   ...prev[parent],
   [child]: value,
   },
   }));

   Alternatively split nested handlers for address and emergencyContact.

5. Component prop typing is missing or wrong in a few places.
   src/components/TopFeatures.tsx:1 destructures untyped props and incorrectly
   includes key as a normal prop. key is React-only and should not be part of
   the component API.
   Fix:

   import type { ReactNode } from "react";
   interface TopFeaturesProps { icon: ReactNode; text: string; }
   const TopFeatures = ({ icon, text }: TopFeaturesProps) => ...

   In src/components/dashboard/StatsCard.tsx:2, DivideIcon as LucideIcon is
   imported as a value and then used as a type in line 8.
   Fix: use the real type export:

   import type { LucideIcon } from "lucide-react";

6. AddEventModal passes an invalid prop to textarea.
   src/components/modals/AddEventModal.tsx:280 includes type="text" on
   <textarea>, which is not a valid textarea attribute.
   Fix: remove type.
7. Several errors are strict-mode hygiene failures, not runtime bugs.
   Unused variables/imports are failing because noUnusedLocals is enabled in
   tsconfig.app.json:18. The current offenders include:
   - src/App.tsx:26: currUser
   - src/components/Dashboard.tsx:4: X
   - src/components/Dashboard.tsx:57: loading
   - src/components/Email.tsx:121: successMessage
   - src/components/Reports.tsx:8: dashboardAPI
   - src/components/HomePage.tsx:1: React
   - src/components/Landing.tsx:273: menuOpen, setMenuOpen
   - src/components/Loader.tsx:1: React
   - src/components/Loader.tsx:2: logo
     Fix: remove them, or wire them into actual behavior if intended.

Suggested order to fix

1. Add shared User / Member / Event interfaces and type the context/state/API
   return values.
2. Fix useParams guards and both invalid useEffect dependency lists.
3. Fix RegistrationForm, TopFeatures, StatsCard, and AddEventModal.
4. Remove unused imports/locals.
5. Re-run npx tsc -b.

I verified this by running npx tsc -b. If you want, I can apply these fixes
and bring the project to a clean type check.
