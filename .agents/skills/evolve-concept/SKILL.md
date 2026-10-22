---
name: evolve-concept
description: >-
  Evolutionary algorithm workflow for refining unstructured text concepts, drafts, and ideas through recursive mutation, crossover, elite selection, and fitness evaluation. Trigger when the user wants to "evolve concept", "run evolutionary refinement", "optimize copy/draft", or develop ideas via genetic iteration.
---

# GravitonEvolve: Evolutionary Concept Refinement

This skill implements an evolutionary algorithm designed to evolve and refine unstructured text concepts, drafts, and ideas through recursive mutation, crossover, and selection of the fittest.

## Directory Structure Required

Before running an evolutionary run:
1. Ensure `/evolution` and `/evolution/process` exist in the workspace root.
2. In `/evolution`:
   - `meta-guidance.md`: Objectives, target audience, tone, fitness scoring criteria, mutation and crossover constraints.
   - `genesis.md`: The starting raw draft, outline, or concept.

## Evolutionary Workflow Steps

1. **Phase 1: Genesis & Population Generation**
   - Read [evolve-concept.md](./references/evolve-concept.md) and [evolve-concept-cycle.md](./references/evolve-concept-cycle.md).
   - Generate initial population (e.g., 10 to 50 variations) in `/evolution/process/` exploring diverse angles.

2. **Phase 2: Fitness Evaluation**
   - Follow [evolve-concept-fitness.md](./references/evolve-concept-fitness.md).
   - Score each variation against criteria defined in `meta-guidance.md` (e.g., clarity, conversion, persuasion, punchiness).

3. **Phase 3: Elite Selection**
   - Follow [evolve-concept-elites.md](./references/evolve-concept-elites.md).
   - Select top-ranking candidates (elites) to preserve unaltered for the next generation.

4. **Phase 4: Mutations & Crossovers**
   - Follow [evolve-concept-mutations.md](./references/evolve-concept-mutations.md) and [evolve-concept-crossovers.md](./references/evolve-concept-crossovers.md).
   - Generate new variations by breeding winning aspects and introducing targeted mutations.

5. **Phase 5: Convergence & Final Result**
   - Repeat the cycle for 3-5 generations until fitness converges.
   - Output the champion variation to `/evolution/result.md`.
