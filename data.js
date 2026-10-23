// Each section = one lecture. Each eq: name, tex, vars (what symbols mean), where (when it shows up / exam tips), tag(s)
// tags: "exam" = asked in a past paper inside the midterm range.
const R = String.raw;
const DIAG = {}, SYMBOLS = {};
const SECTIONS = [
{
 id: "L1", title: "Lecture 1 · Basic Circuit Principles", blurb: "Charge, current, voltage, power and energy, plus the four kinds of dependent source. Quiz-style questions come from here.",
 eqs: [
  {name:"Current from charge", tex:R`i=\frac{dq}{dt}\qquad q(t)=\int_{t_0}^{t} i\,d\tau+q(t_0)`, vars:R`Current in A = C/s. The area under an $i(t)$ graph is the charge moved.`, where:R`Sadiku 1.3–1.9: differentiate a given $q(t)$, or integrate an $i(t)$ graph piece by piece.`, tags:["basics"]},
  {name:"Voltage", tex:R`v_{ab}=\frac{dw}{dq}`, vars:R`Energy per unit charge, in V = J/C. $v_{ab}=-v_{ba}$.`, where:R`Reading polarity marks. $v_{ab}$ means the + sign is at $a$.`, tags:["basics"]},
  {name:"Power and the passive sign convention", tex:R`p=vi=\frac{dw}{dt}`, vars:R`If the current <b>enters the + terminal</b>, $p=+vi$ is power absorbed. If it enters the − terminal, use $p=-vi$. A negative absorbed power means the element supplies power.`, where:R`Every power question: Sadiku 1.13–1.20, and "power supplied by each source" parts.`, tags:["basics","exam"]},
  {name:"Energy", tex:R`w=\int_{t_0}^{t}p\,d\tau=\int_{t_0}^{t}v\,i\,d\tau`, vars:R`In J. For a bill, use kWh: $w=P\,t$ with $P$ in kW and $t$ in hours.`, where:R`Sadiku 1.13(b), 1.23–1.31 (electricity cost).`, tags:["basics"]},
  {name:"Conservation of power (Tellegen)", tex:R`\sum_{\text{all elements}} p = 0`, vars:R`Total power absorbed = total power supplied.`, where:R`Sadiku 1.17–1.20. It is also a quick check on any answer: the source powers must balance the resistor powers.`, tags:["basics"]},
  {name:"Dependent (controlled) sources", tex:R`\text{VCVS: }v=\mu v_x\quad \text{CCVS: }v=r\,i_x\quad \text{VCCS: }i=g\,v_x\quad \text{CCCS: }i=\beta\,i_x`, vars:R`Drawn as diamonds. Write the controlling $v_x$ or $i_x$ in terms of your unknowns as an extra equation.`, where:R`In nearly every past-paper nodal, mesh and Thevenin question (2016 Q1, 2017 Q3, 2019 Q2–Q3, 2020 B4).`, tags:["basics","exam"]},
 ]
},
{
 id: "L2", title: "Lecture 2 · Basic Circuit Laws", blurb: "Ohm's law, KCL, KVL, series/parallel, voltage and current division, and wye–delta. These are the tools inside every other method.",
 eqs: [
  {name:"Ohm's law and resistor power", tex:R`v=iR\qquad G=\frac1R\qquad p=vi=i^2R=\frac{v^2}{R}`, vars:R`$G$ in siemens (S). A resistor always absorbs power. Short circuit: $R=0$. Open circuit: $R=\infty$.`, where:R`Everywhere. Sadiku 3.x figures often label conductances in S, so use $i=Gv$.`, tags:["laws","exam"]},
  {name:"Nodes, branches and loops", tex:R`b=l+n-1`, vars:R`$b$ branches, $n$ nodes, $l$ independent loops (meshes in a planar circuit). A node is everything joined by plain wire.`, where:R`Sadiku 2.5–2.7. Merge wire-connected points into one node before you count.`, tags:["laws"]},
  {name:"Kirchhoff's current law (KCL)", tex:R`\sum i_{\text{in}}=\sum i_{\text{out}}\qquad\Big(\sum_{n} i_n=0\Big)`, vars:R`Holds at every node and for any closed surface (that is why a supernode works).`, where:R`Basis of nodal analysis: 2016 Q1, 2017 Q2–Q3, 2019 Q2, 2020 A2.`, tags:["laws","exam"]},
  {name:"Kirchhoff's voltage law (KVL)", tex:R`\sum_{\text{loop}} v=0\qquad\Big(\sum \text{rises}=\sum\text{drops}\Big)`, vars:R`Go round the loop in one direction. Use $+v$ when you enter the + terminal and $-v$ when you enter the − terminal.`, where:R`Basis of mesh analysis: 2018 Q2, Tutorial 1 Q3 and Q5.`, tags:["laws","exam"]},
  {name:"Series resistors and voltage division", tex:R`R_{eq}=R_1+R_2+\dots\qquad v_k=\frac{R_k}{R_1+R_2+\dots}\,v`, vars:R`Series = same current. Divider only when no current leaves the middle node.`, where:R`Thevenin open-circuit voltages (2017 Q1, 2018 Q1, 2020 B5) are usually one or two dividers.`, tags:["laws","exam"]},
  {name:"Parallel resistors and current division", tex:R`\frac1{R_{eq}}=\sum\frac1{R_k}\qquad R_1\parallel R_2=\frac{R_1R_2}{R_1+R_2}\qquad i_1=\frac{R_2}{R_1+R_2}\,i`, vars:R`Parallel = same voltage. The current takes the <i>other</i> resistor's value in the numerator.`, where:R`$R_{eq}$ and $R_{Th}$ with sources off: 2019 Q1, 2020 A1, Tutorial 1 Q1, Sadiku 2.35–2.47.`, tags:["laws","exam"]},
  {name:"Delta → wye (Δ → Y)", tex:R`R_1=\frac{R_bR_c}{R_a+R_b+R_c},\quad R_2=\frac{R_cR_a}{R_a+R_b+R_c},\quad R_3=\frac{R_aR_b}{R_a+R_b+R_c}`, vars:R`Each Y arm = product of the two adjacent Δ resistors ÷ sum of all three. Balanced: $R_Y=R_\Delta/3$.`, where:R`Bridges that are not series/parallel (Tutorial 1 Q3, Sadiku 2.49, 2.53).`, tags:["laws"]},
  {name:"Wye → delta (Y → Δ)", tex:R`R_a=\frac{R_1R_2+R_2R_3+R_3R_1}{R_1}\quad(\text{and similarly for }R_b,R_c)`, vars:R`Each Δ resistor = (sum of pairwise products) ÷ the <i>opposite</i> Y arm. Balanced: $R_\Delta=3R_Y$.`, where:R`Sadiku 2.48, 2.51. A balanced bridge ($R_1/R_2=R_3/R_4$) carries no current in the middle, so you can delete it (2020 A1).`, tags:["laws","exam"]},
 ]
},
{
 id: "L3", title: "Lecture 3 · Methods of Analysis", blurb: "Nodal and mesh analysis, the special cases with voltage or current sources, and writing the matrix equations by inspection.",
 eqs: [
  {name:"Nodal analysis (KCL in node voltages)", tex:R`\sum_{\text{branches}}\frac{v_k-v_j}{R_{kj}}=\sum i_{\text{source into }k}`, vars:R`Pick a reference node (ground, $v=0$), name the other $n-1$ node voltages, and write KCL at each one. Current leaving through a resistor is $(v_{\text{here}}-v_{\text{other}})/R$.`, where:R`2016 Q1, 2017 Q3, 2019 Q2, Tutorial 1 Q2 and Q4, Sadiku 3.5–3.32.`, tags:["nodal","exam"]},
  {name:"Supernode", tex:R`v_i-v_j=V_s\qquad \text{KCL on the closed surface around both nodes}`, vars:R`Used when a voltage source (independent or dependent) sits between two non-reference nodes. You cannot write the source current with Ohm's law, so wrap both nodes and use the constraint equation.`, where:R`2016 Q1 (two supernodes merge), 2019 Q2, Tutorial 1 Q4, Sadiku 3.13, 3.23.`, tags:["nodal","exam"]},
  {name:"Mesh analysis (KVL in mesh currents)", tex:R`\sum_{\text{mesh}} R\,(i_{\text{this}}-i_{\text{neighbour}})=\sum v_{\text{source rises}}`, vars:R`Only for planar circuits. Take all mesh currents clockwise. A shared resistor carries $i_1-i_2$.`, where:R`2018 Q2, Tutorial 1 Q3 and Q5, Sadiku 3.36–3.66.`, tags:["mesh","exam"]},
  {name:"Supermesh", tex:R`i_a-i_b=I_s\qquad \text{KVL round the outside of both meshes}`, vars:R`Used when a current source is shared by two meshes. Skip the source's branch in the KVL, and add the current constraint. A current source on an outer edge simply fixes that mesh current.`, where:R`Tutorial 1 Q5, Sadiku 3.51–3.52.`, tags:["mesh","exam"]},
  {name:"Nodal by inspection", tex:R`\mathbf G\mathbf v=\mathbf i,\qquad G_{kk}=\sum\text{conductances at }k,\quad G_{kj}=-(\text{conductance between }k,j)`, vars:R`$i_k$ = sum of independent current sources flowing <i>into</i> node $k$. Only works directly when every source is an independent current source.`, where:R`2017 Q2 is exactly this ("by inspection, obtain the node-voltage equations"). Sadiku 3.67–3.70.`, tags:["nodal","exam"]},
  {name:"Mesh by inspection", tex:R`\mathbf R\mathbf i=\mathbf v,\qquad R_{kk}=\sum R\text{ round mesh }k,\quad R_{kj}=-(R\text{ shared by }k,j)`, vars:R`$v_k$ = sum of source voltages that push current clockwise round mesh $k$ (a rise in the clockwise direction is +). Only works directly when every source is an independent voltage source.`, where:R`2018 Q2 is exactly this ("write the mesh-current equations by inspection"). Sadiku 3.71–3.74.`, tags:["mesh","exam"]},
  {name:"Cramer's rule (2 × 2)", tex:R`\begin{bmatrix}a&b\\c&d\end{bmatrix}\begin{bmatrix}x\\y\end{bmatrix}=\begin{bmatrix}e\\f\end{bmatrix}\Rightarrow x=\frac{ed-bf}{ad-bc},\; y=\frac{af-ec}{ad-bc}`, vars:R`For 3 × 3 or larger systems, use your calculator's equation solver.`, where:R`Solving any nodal or mesh system by hand.`, tags:["nodal","mesh"]},
 ]
},
{
 id: "L4", title: "Lecture 4 · Circuit Theorems", blurb: "Linearity, superposition, source transformation, Thevenin and Norton. Every past paper has a Thevenin question, and nearly every one adds maximum power transfer.",
 eqs: [
  {name:"Linearity", tex:R`\text{input}\times k\;\Rightarrow\;\text{every response}\times k`, vars:R`Ladder trick: assume the output is 1 V (or 1 A), work back to the source, then scale.`, where:R`Sadiku 4.1–4.7. Also 2016 Q3 / Sadiku 4.86, where a linear circuit is identified from measurements.`, tags:["theorem"]},
  {name:"Superposition", tex:R`v=v'+v''+\dots\quad(\text{one independent source on at a time})`, vars:R`Turn off the other independent sources: voltage source → short, current source → open. <b>Never turn off dependent sources.</b> It does not work for power, because power is not linear.`, where:R`2019 Q3, Tutorial 2 Q1, Sadiku 4.8–4.19.`, tags:["theorem","exam"]},
  {name:"Source transformation", tex:R`v_s=i_sR\qquad\Longleftrightarrow\qquad i_s=\frac{v_s}{R}`, vars:R`A voltage source in series with $R$ is the same as a current source in parallel with the same $R$. The current arrow points toward the + terminal.`, where:R`Tutorial 2 Q2, Sadiku 4.20–4.32. It is also the fastest way to collapse a branch in 2016 Q2.`, tags:["theorem","exam"]},
  {name:"Thevenin's theorem", tex:R`V_{Th}=v_{oc}\qquad R_{Th}=\frac{v_{oc}}{i_{sc}}`, vars:R`Independent sources only: turn them off and find $R_{eq}$. With dependent sources: use $v_{oc}/i_{sc}$, or turn off independent sources, apply a 1 A test source and use $R_{Th}=v_{test}/1$. $R_{Th}$ can come out negative.`, where:R`2016 Q2, 2019 Q4, 2020 B5, Tutorial 2 Q3 and Q5, Sadiku 4.33–4.65.`, tags:["theorem","exam"]},
  {name:"Norton's theorem", tex:R`I_N=i_{sc}\qquad R_N=R_{Th}\qquad V_{Th}=I_NR_N`, vars:R`A current source $I_N$ in parallel with $R_N$. Convert to or from Thevenin with a source transformation.`, where:R`2016 Q2, 2019 Q4, 2020 B4, Tutorial 2 Q4–Q5.`, tags:["theorem","exam"]},
  {name:"Maximum power transfer", tex:R`R_L=R_{Th}\quad\Rightarrow\quad P_{max}=\frac{V_{Th}^2}{4R_{Th}}=\frac{I_N^2R_N}{4}`, vars:R`It is not in the Lecture 4 slides, but every past paper asks it. For "what % of the source power reaches $R_L$", put $R_L$ back into the original circuit and compute the source power.`, where:R`2016 Q3, 2017 Q1, 2018 Q1, 2019 Q4, 2020 B4–B5, Sadiku 4.66–4.75.`, tags:["theorem","exam"]},
  {name:"Thevenin from two measurements", tex:R`v=V_{Th}-R_{Th}\,i\qquad\text{or}\qquad v=V_{Th}\frac{R_L}{R_L+R_{Th}}`, vars:R`Two readings give two equations in $V_{Th}$ and $R_{Th}$. Use a third reading to check.`, where:R`2016 Q3 (black box with a table), Sadiku 4.83–4.86.`, tags:["theorem","exam"]},
 ]
},
{
 id: "OA", title: "Op Amps · slides 1–9", blurb: "Only the op-amp model, ideal vs non-ideal, and the inverting amplifier are in range. Summing, difference and cascaded circuits come after slide 9.",
 eqs: [
  {name:"Op amp as a VCVS", tex:R`v_o=A\,v_d=A\,(v_2-v_1)`, vars:R`$v_2$ = non-inverting (+) input, $v_1$ = inverting (−) input. Real values: $A\approx10^5$–$10^8$, $R_i\approx10^5$–$10^{13}\,\Omega$, $R_o\approx10$–$100\,\Omega$.`, where:R`Non-ideal model (slide 6). Example 1 on slides 7–8 replaces the op amp with $R_i$, $R_o$ and $Av_d$ and uses nodal analysis.`, tags:["opamp"]},
  {name:"Saturation", tex:R`-V_{CC}\le v_o\le +V_{CC}`, vars:R`The output cannot exceed the supply rails. It is linear only while $|Av_d|<V_{CC}$.`, where:R`Slide 6. Later papers ask what input range keeps the op amp linear.`, tags:["opamp"]},
  {name:"Ideal op amp", tex:R`A\to\infty,\quad R_i\to\infty,\quad R_o\to0\;\Rightarrow\; i_1=i_2=0,\quad v_1=v_2`, vars:R`Two rules (with negative feedback): no current flows into either input, and the two input voltages are equal.`, where:R`2020 A3 ("Name two characteristics of an ideal op amp", 5 marks). Every op-amp circuit analysis uses these two rules.`, tags:["opamp","exam"]},
  {name:"Inverting amplifier", tex:R`\frac{v_o}{v_i}=-\frac{R_f}{R_i}`, vars:R`KCL at the − input: $\frac{v_i-v_1}{R_i}=\frac{v_1-v_o}{R_f}$ with $v_1=v_2=0$ (virtual ground). Input resistance seen by $v_i$ is $R_i$.`, where:R`Slide 9. $R_i=10\,$kΩ, $R_f=20\,$kΩ gives −2. The non-ideal Example 1 gives −1.99997, which is why the ideal model is good enough.`, tags:["opamp"]},
 ]
},
];

const SOLVING_TIPS = [
 {t:"Pick the method by counting", b:R`Fewer non-reference nodes than meshes → nodal. Fewer meshes → mesh. Voltage source between two non-reference nodes → supernode. Current source shared by two meshes → supermesh.`},
 {t:"Dependent sources need one extra equation", b:R`Before solving, write the controlling quantity ($v_x$, $i_x$) in terms of your unknowns. For superposition, leave every dependent source switched on.`},
 {t:"Thevenin with dependent sources", b:R`Don't just combine resistors. Use $R_{Th}=v_{oc}/i_{sc}$, or kill the independent sources and drive the terminals with a 1 A test source.`},
 {t:"Max power: two different circuits", b:R`$P_{max}=V_{Th}^2/4R_{Th}$ uses the Thevenin model. "% of source power" uses the original circuit with $R_L=R_{Th}$ in place (2017 Q1, 2018 Q1).`},
 {t:"Keep the signs", b:R`A negative current or voltage just means the true direction is opposite to the one you assumed. Don't flip it unless the question asks for magnitude.`},
 {t:"Check with something you didn't use", b:R`KCL at a node you skipped, or $\sum p=0$. It takes one minute and catches most sign slips.`},
];
