[4/4/2025]
Scanline Thickness Issue
1. Initial Issue

Symptoms: 1px thickness didn't render as expected.

Observed Behavior: The effect was inconsistent across multiple browsers (Chrome, Opera, Firefox).

Cause: Potential changes in how thin background layers are rendered by browser engines like Blink and Gecko.

2. Testing Results

1px: Only works if it's slightly above (tested at 1.1px), indicating a limitation in rendering ultra-thin elements.

4px: Confirmed to consistently deliver the intended visual effect.

3. Workarounds

mix-blend-mode: overlay and background-size adjustments: No effect on rendering behavior.

Box-shadow, mask-image, and translateZ(0): Confirmed to have no impact.

Conclusion: 4px is the confirmed stable configuration for the desired result.

4. Solution

Final Solution: Implemented a 4px thickness to achieve the consistent and expected visual effect.

===============================================

[4/12/2025]

Premise: Need granular control on boot up sequence and shutdown sequence.

Reason: Simulate old-school terminal, following Skeumorphism as best as I could.

Problem: 
1. Vanilla context-reducer pairs are not atomic enough
2. Designed flow demands deterministic step by step control to the render space, not unlike a stepper motor logic.
3. Considered `Async/Sync + Promise pair`, it is concluded that precise timings have error boundaries.
4. Considered `Zustand`. While simpler, does not give timing and per steps render control.
5. Considered `xState`. It seems advanced and not at the same time? Fulfils the requirement, but is not adapted because I don't see use of it outside of this project if adapted. Will adapt later if needed to be.
6. Considered `Redux + middleware pairs`. Redux-toolkit and redux-saga seems to be able to do the job nicely and could mesh well with projects outside of this one.

What I did so far: Designed a deterministic FSM to outline how I want the logic to run for this specific node of actions.

Flow-chart, pseudo FSM:
```
---
config:
  layout: elk
---
stateDiagram
  direction TB
  state Clean.shutdown {
    direction TB
    clean.shutdown.animation
    clean.cache.shutdown
  }
  state Clean.boot {
    direction TB
    clean.boot.animation
    clean.cache.boot
  }
  [*] --> Global_toggle.button:user actions
  global_context --> Local.Context:monitor state
  global_context --> Global_toggle.button:Monitor component , confirm toggle state
  Global_toggle.button --> global_context:send status (boolean on/off)
  global_context --> Local.Context:setOff
  global_context --> Local.Context:setOn
  local.Reducer --> Logic_handler:Dispatch state payload
  Local.Context --> local.Reducer:update state
  Shutdown_sequence --> UnmountNavbar:First component
  UnmountNavbar --> Animation_shutdown:trigger animation
  Animation_shutdown --> Unmount:Delay until animation clears
  Unmount --> islast.shutdown.step?:clean cache
  islast.shutdown.step? --> Clean.shutdown:IfNo
  islast.shutdown.step? --> payload.shutdown.complete:Ifyes
  clean.cache.shutdown --> payload.shutdown.complete
  clean.shutdown.animation --> payload.shutdown.complete
  Shutdown_sequence --> UnmountScanline:third component
  Shutdown_sequence --> UnmountFooter:second component
  UnmountScanline --> Animation_shutdown:trigger animation
  UnmountFooter --> Animation_shutdown:Trigger animation
  payload.shutdown.complete --> Local.Context:dispatch state first component clear
  payload.shutdown.complete --> Local.Context:dispatch state second component clear
  payload.shutdown.complete --> Local.Context:dispatch state third component clear
  Boot_sequence --> Mount_Navbar:Second component
  Mount_Navbar --> Animation_boot:trigger animation
  Boot_sequence --> Mount_Scanline:FIrst component
  Mount_Scanline --> Animation_boot:trigger animation
  Boot_sequence --> Mount_footer:Third component
  Mount_footer --> Animation_boot:trigger animation
  Animation_boot --> Mount:Delay until animation clears
  Mount --> islast.boot.step?:clean cache
  islast.boot.step? --> Clean.boot:ifNot
  islast.boot.step? --> payload.boot.complete:ifyes
  clean.boot.animation --> payload.boot.complete
  clean.cache.boot --> payload.boot.complete
  payload.boot.complete --> Local.Context:dispatch state Scanline active
  payload.boot.complete --> Local.Context:dispatch state Navbar mounted
  payload.boot.complete --> Local.Context:dispatch state Footer Mounted
  Local.Context --> global_context:dispatch state Boot/Shutdown complete
  Local.Context --> [*]:update state
  Logic_handler --> Render.wrapper:send payload, ensures no mutation to component logic
  Logic_handler --> Render.wrapper:send payload, ensures no mutation to component logic
  Render.wrapper --> Boot:Initiate boot if isOn
  Render.wrapper --> Shutdown:Initiate shutdown if !isOn
  Boot --> Boot_sequence:isInit? initiate boot
  Boot --> Boot_sequence:is(n)step? initiate next step
  Boot --> Local.Context:isnotInit/complete? do not do anything
  Shutdown --> Shutdown_sequence:isInit? Initiate Shutdown
  Shutdown --> Shutdown_sequence:is(n)step? Initiate next step
  Shutdown --> Local.Context:isnotInit/complete? do not do anything
```

Conclusion: Redux-Toolkit choosen.

Next step: Learn Redux middlewares and choose between redux-thunk or redux-saga.

================================================

[4/16/2025]

Dev blog.

Problem: Related to log timestamped at [4/12/2025].

Progress: 
1. Learned Redux-toolkit patterns, started to prototype store.
2. Decided on redux-saga for a more robust deterministic control sequence.
3. created a dumb toggle for the event emitter.

==============================================

 [4/18/2025]

 Debug log : application of redux reducers.

 Issue :
 - during first implementation of UiSlice to the website, the reducer did not get defined.
 - Not nill, not null, not actually undefined, but registers as an object `{}`

 Tracking:
 - put console.log command on both the Tx component (powertoggle) and the Rx component (UiSlice).

 Result: 
 - signal(action payload) sent from the Tx component. 
 - console shows reducer is defined as an object.

 Debug:
 - checked linkage in the files between UiSlice and globalStore. No issue.
 - Removed dependencies, cleared cache, assumed Next is stale since the next.js error handler in browser declares it is stale. Doing this as stale cache could make a problem with component registration. Thrice. Reducer still did not get defined.
 - Tried putting a dummy reducer by putting the following test reducer code in the store.ts. This clears the issue temporarily.
 ```ts
 const testReducer = (state = { navbarVisible: true }, action) => state;

export const makeStore = () => configureStore({
  reducer: {
    Ui: testReducer,
  },
})
```

Hypothesis
- It's a coupling problem (disproved).
- It's a circular dependency problem (no indication, code is clear).
- It's a cache problem (disproved thrice, just to be safe).
- Mistyping in code (disproved).
- It's related to syntax (possible).

Rationale
- `Ui: testReducer` works. The original `Ui: UiReducer` didn't.
- `Ui: testReducer` is a dummy assigned to the global store directly.
- `Ui: UiBootReducer` still throws error.
- Try: `Ui[randomstring]: UiReducer` to disprove my own hypothesis.

Try:
- adding a random string to the name of the reducer definition and adjusting the reducer in UiSlice.ts. (Ui -> UiSlice). This solved the problem and allows the reducer to be registered to global store.

Conclusion:
- A syntax mismatch. I am unaware of "Ui" being reserved. It took me a while to get this.

Lesson learned:
- If all possible solution is disproved or not a problem in the first place, check naming conventions.

[4/19/2025]

More on Saga and orchestration control.

Current format:
- powerstate lives in the UI slice.

Planned/intended format:
- powerstate is intended to be a pure signal, not state tracking. Render state is managed locally, isolated, decoupled, with the powerstate emitted as side effect to act as a trigger for cascading effect waterfall.

Brainstorming:
- saga actions, considered for a centralised or modular way of controling saga.
- coupling the saga to listen ro `powerstate` directly inside the UI.

Consideration:
- Coupling the saga middleware directly to `powerstate` inside the slice has the hallmarks of coupling issues. 
- `Action.ts` as centralised saga control has it's own complexity with the level of abstraction and linkage coupling introduced.
- Discussion with AI confirms that coupling saga middleware to slice directly puts more constraint on the error boundaries.

Hypothesis:
- Since the planned feature is a chaining of side effects, perhaps use saga. Learning how to wire one is not a bad thing.

Personal commentary:
- Decoupling rootReducers to combine slices and rootSaga to combine actions with the aim of separation of concerns from the global store is both a pain point and extra overhead. But necessary, because of how this project would go into simulated system skeumorphism.

Actions taken: 
- Defined action and decoupled the signal from slice to point to the `action.ts` file to act as trigger.
- Prototyped a simple saga sequential chain with some help.
- started to identify that rootReducer and rootSaga is needed for modularity, even with extra overhead.

[4/20/2025]

Saga implementation, debugging session.

Problem: Saga double fires signal to reducer, effectively canceling the intended effect.

Tracking: added console log at specific points of the saga and reducer. 'init' at start of saga, 'saga hit (x)' at the step that is not firing, and 'saga reached (x)' in the reducer state change itself.

Hypothesis:
- Naming convention
- Faulty saga and reducer sync to component.
- Improper selector configuration.

Steps taken:
- renaming saga and reducer. (minimal effect)
- combining both into root configurations. (does nothing)
- reconfigured `useAppDispatch` hook in emmiter component (does nothing)
- reconfigured `useAppSelector` hook in receiver component (improved signal tracking, does not change behavior)
- deleted steps, logging which reducer gets removed from the saga manually. (inconsistent behavior)

Analysis:
- naming convention is the problem (contested, minimal if at all behavior change)
- scattered saga and reducer configuration (disproved, combining both into root shows the same behavior)
- files linkage (considered, but signal tracking via console.log() contests this heavily)
- one of the process breaks the intended effect. (possible, produces inconsistent behavior when fiddled with)

Debug:
- analyse linkage between saga, reducer and store (passed)
- analyse emmiter component (passed)
- analyse receiver component (passed)
- analyse process itself. (unclear signal)
- try: modifying steps in saga (produces change in behavior)
- analyse `toggleX` reducer in slice (noticed a switch function)
- try: removing `togglex` actions from the saga itself (issue clears)
- try: adding one `togglex` action from back into the saga (issue reappears)

verdict:
- `toggleXcomponent` reducer sets `setXVisible` reducer directly. Producing a double toggle that cancels the intended effect [off->on] and instead produces [off->on->on].

next step:
- critical: Make sure the {children} renders last. Accept tradeoffs no matter what.
- wire the component properly to the saga. remove the `toggleX` component from the reducer or refactor it as side effects.

[4/21/2025]

Current status: 
- roughly implemented stepper orchestration.
- making sure {childern} renders last is surprisingly... easier than anticipated.
- tried applying useEffect so navbar resets each time it gets removed from render with the following code: ```ts
 useEffect(() => {
        if (!isNavbarVisible) {
            setIsMenuVisible(false);  // Close the menu if navbar is hidden
        }
    }, [isNavbarVisible]);  // Do not change unless isNavbarVisible changed.```
     ditched the idea. Breaks UX, previous behaviour simulates cache better.

Todo: 
- advanced animation orchestration (?)
- consider using lazyloader as a fast animation placeholder. should give illusion of speed for UX.