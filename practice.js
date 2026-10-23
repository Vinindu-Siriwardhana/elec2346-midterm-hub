// Practice bank: one entry per Study-plan item (pid matches plan.js "group:index").
// q = question, a = worked answer (HTML with $...$ KaTeX). R = String.raw (defined in data.js).
// Every numerical answer was checked by solving the circuit equations in Python; Sadiku odd answers also match the answer key.
// Figures cropped from the original PDFs (img/<name>.png).
const FIGS = {
 "tut:0":["t1_1"],"tut:1":["t1_2"],"tut:2":["t1_3"],"tut:3":["t1_4"],"tut:4":["t1_5"],
 "tut:5":["t2_1"],"tut:6":["t2_2"],"tut:7":["t2_3"],"tut:8":["t2_4"],"tut:9":["t2_5"],
 "pp:0":["p16_1"],"pp:1":["p16_2"],"pp:2":["p16_3"],"pp:3":["p17_1"],"pp:4":["p17_2"],"pp:5":["p17_3"],
 "pp:6":["p18_1"],"pp:7":["p18_2"],"pp:8":["p19_1"],"pp:9":["p19_2"],"pp:10":["p19_3"],"pp:11":["p19_4"],
 "pp:13":["p20_a1"],"pp:14":["p20_a2"],"pp:16":["p20_b4"],"pp:17":["p20_b5"],
 "oa:1":["oa_ex1"],"oa:2":["oa_inv"],
 "s1:1":["s1_17"],"s1:2":["s1_19"],
 "s2:0":["s2_15"],"s2:1":["s2_21"],"s2:2":["s2_25"],"s2:3":["s2_35"],"s2:4":["s2_41"],"s2:5":["s2_43"],"s2:6":["s2_47"],
 "s3:0":["s3_9"],"s3:1":["s3_13"],"s3:2":["s3_19"],"s3:3":["s3_21"],"s3:4":["s3_23"],"s3:5":["s3_49"],"s3:6":["s3_51"],"s3:7":["s3_67"],"s3:8":["s3_71"],
 "s4:0":["s4_5"],"s4:1":["s4_13"],"s4:2":["s4_15"],"s4:3":["s4_17"],"s4:4":["s4_25"],"s4:5":["s4_33"],"s4:6":["s4_37"],"s4:7":["s4_47"],
 "s4:8":["s4_53"],"s4:9":["s4_63"],"s4:10":["s4_65"],"s4:11":["s4_71"],"s4:12":["s4_73"],"s4:14":["s4_85"],
};
const PRACTICE = [
// ───────── Tutorials ─────────
{pid:"tut:0", src:"Tutorial 1 Q1", q:R`Find $R_{eq}$ and $i_o$ in the circuit of Fig. 1 (40 V source, 5 Ω in series).`,
 a:R`The right ends of the 12 Ω and 6 Ω meet at one node (call it Z, the top of the 20 Ω). The 80 Ω and 60 Ω both run to the bottom wire, which is ground.<br>
 • $12\parallel6=4\,\Omega$ between node X (after the 5 Ω) and Z.<br>
 • At Z: $20\parallel80=16\,\Omega$ to ground, so the X → ground path through Z is $4+16=20\,\Omega$.<br>
 • At X: $15\parallel60\parallel20$: $\tfrac1{15}+\tfrac1{60}+\tfrac1{20}=\tfrac{8}{60}\Rightarrow7.5\,\Omega$.<br>
 $R_{eq}=5+7.5=\mathbf{12.5\,\Omega}$, &nbsp; $i_o=\dfrac{40}{12.5}=\mathbf{3.2\,A}$.`},
{pid:"tut:1", src:"Tutorial 1 Q2 = Sadiku 3.25", q:R`Use nodal analysis to determine the node voltages $v_1$–$v_4$ in Fig. 2.`,
 a:R`KCL (currents leaving = 0) at each node, ground at the bottom:<br>
 $v_1:\ \dfrac{v_1-v_2}{1}+\dfrac{v_1-v_4}{20}=4$<br>
 $v_2:\ \dfrac{v_2-v_1}{1}+\dfrac{v_2}{8}+\dfrac{v_2-v_3}{10}=0$<br>
 $v_3:\ \dfrac{v_3-v_2}{10}+\dfrac{v_3-v_4}{10}+\dfrac{v_3}{20}=0$<br>
 $v_4:\ \dfrac{v_4-v_1}{20}+\dfrac{v_4-v_3}{10}+\dfrac{v_4}{30}=0$<br>
 Solve the 4 × 4 system on your calculator:<br>
 $v_1=\mathbf{25.52\,V},\ v_2=\mathbf{22.05\,V},\ v_3=\mathbf{14.84\,V},\ v_4=\mathbf{15.06\,V}$ (matches the Sadiku 3.25 key).`},
{pid:"tut:2", src:"Tutorial 1 Q3 = Sadiku 3.43", q:R`Use mesh analysis to find $v_{ab}$ and $i_o$ in Fig. 3 (two 80 V sources stacked, 20 Ω and 30 Ω network).`,
 a:R`Three windows, all clockwise: $i_1$ top (top 80 V, top 20 Ω, upper 30 Ω, middle 20 Ω), $i_2$ bottom (bottom 80 V, middle 20 Ω, lower 30 Ω, bottom 20 Ω), $i_3$ the right triangle (three 30 Ω).<br>
 Mesh 1: $70i_1-20i_2-30i_3=80$<br>
 Mesh 2: $-20i_1+70i_2-30i_3=80$<br>
 Mesh 3: $-30i_1-30i_2+90i_3=0$<br>
 By symmetry $i_1=i_2$ ⇒ $50i_1-30i_3=80$ and $i_3=\tfrac23 i_1$ ⇒ $i_1=2.667$ A, $i_3=1.778$ A.<br>
 The 30 Ω across $a$–$b$ carries only $i_3$ (downwards): $i_o=\mathbf{1.778\,A}$, $v_{ab}=30i_o=\mathbf{53.33\,V}$.`},
{pid:"tut:3", src:"Tutorial 1 Q4 = Sadiku 3.31", q:R`Find the node voltages $v_1,v_2,v_3$ in Fig. 4 (CCVS $4i_o$ between $v_1$ and $v_2$, VCCS $2v_o$ from $v_3$ to $v_2$).`,
 a:R`Controls: $i_o=v_3/4$, &nbsp; $v_o=v_1-v_3$. The $4i_o$ source makes a supernode: $v_2-v_1=4i_o=v_3$.<br>
 Supernode $\{v_1,v_2\}$: $\ \dfrac{v_1}{4}+\dfrac{v_1-v_3}{1}+\dfrac{v_2}{1}-2v_o=1$<br>
 Node 3: $\ \dfrac{v_3-v_1}{1}+\dfrac{v_3}{4}+\dfrac{v_3-10}{2}+2v_o=0$<br>
 Substitute the controls and solve:<br>
 $v_1=\mathbf{4.970\,V},\ v_2=\mathbf{4.848\,V},\ v_3=\mathbf{-0.1212\,V}$.`},
{pid:"tut:4", src:"Tutorial 1 Q5 = Sadiku 3.52", q:R`Use mesh analysis to find $i_1$, $i_2$, $i_3$ in Fig. 5 (3 A source shared by meshes 2 and 3, CCVS $2v_o$).`,
 a:R`All clockwise. $v_o$ is across the 2 Ω (+ at top): $v_o=2(i_1-i_2)$.<br>
 Mesh 1: $-12+2(i_1-i_2)+4(i_1-i_3)=0$<br>
 Supermesh 2+3 (skip the 3 A branch): $2(i_2-i_1)+8i_2+2v_o+4(i_3-i_1)=0$<br>
 Constraint (3 A points right, the way $i_3$ flows): $i_3-i_2=3$<br>
 Solve: $i_1=\mathbf{3.5\,A},\ i_2=\mathbf{-0.5\,A},\ i_3=\mathbf{2.5\,A}$ (so $v_o=8$ V).`},
{pid:"tut:5", src:"Tutorial 2 Q1 = Sadiku 4.11", q:R`Use superposition to find $i_o$ and $v_o$ in Fig. 1 (6 A, 30 V, CCCS $4i_o$).`,
 a:R`Let A be the top of the 40 Ω and B the right end of the 10 Ω. Keep $4i_o$ on in both parts.<br>
 <b>6 A only</b> (30 V → short): node B: $-i_o'-4i_o'+\tfrac{B}{20}=0\Rightarrow B=100i_o'$, so $A=110i_o'$. Node A: $\tfrac{110i_o'}{40}+i_o'=6\Rightarrow i_o'=1.6$ A.<br>
 <b>30 V only</b> (6 A → open): $A=-40i_o''$, $B=-50i_o''$. Node B: $-5i_o''+\tfrac{B+30}{20}=0\Rightarrow i_o''=0.2$ A.<br>
 $i_o=1.6+0.2=\mathbf{1.8\,A}$, &nbsp; $v_o=10i_o=\mathbf{18\,V}$.`},
{pid:"tut:6", src:"Tutorial 2 Q2 = Sadiku 4.27", q:R`Apply source transformation to find $v_x$ in Fig. 2.`,
 a:R`Left: 50 V + 10 Ω → 5 A ∥ 10 Ω; with the 40 Ω: 5 A ∥ 8 Ω → <b>40 V in series with 8 Ω</b>.<br>
 Right: 40 V + 20 Ω → 2 A ∥ 20 Ω; add the 8 A: 10 A ∥ 20 Ω → <b>200 V in series with 20 Ω</b>.<br>
 Single loop: $40$ V –8 Ω– $a$ –12 Ω– $b$ –20 Ω– $200$ V. Current from $b$ to $a$: $\dfrac{200-40}{8+12+20}=4$ A.<br>
 $v_x=v_a-v_b=-12(4)=\mathbf{-48\,V}$ ($b$ is 48 V above $a$; the tutorial sheet quotes the magnitude, 48 V).`},
{pid:"tut:7", src:"Tutorial 2 Q3 = Sadiku 4.43", q:R`Find the Thevenin equivalent looking into $a$–$b$ (with the 6 Ω removed) in Fig. 3 and solve for $i_x$.`,
 a:R`$R_{Th}$: sources off → $10\parallel10=5\,\Omega$ on the $a$ side plus $5\,\Omega$ on the $b$ side: $R_{Th}=\mathbf{10\,\Omega}$.<br>
 $V_{Th}$: $v_a=20\cdot\frac{10}{20}=10$ V, $v_b=2\times5=10$ V ⇒ $V_{Th}=\mathbf{0\,V}$.<br>
 So $i_x=\dfrac{0}{10+6}=\mathbf{0\,A}$.`},
{pid:"tut:8", src:"Tutorial 2 Q4 = Sadiku 4.50", q:R`Obtain the Norton equivalent to the left of $a$–$b$ in Fig. 4. Use it to find $i$.`,
 a:R`<b>$R_N$</b>: 2 A → open, 12 V → short: $4+6=\mathbf{10\,\Omega}$.<br>
 <b>$I_N$</b>: short $a$–$b$ ($v_a=0$), so the 6 Ω/12 V junction is at $+12$ V. KCL at the top of the 4 Ω (node P): $2=\dfrac{P}{4}+\dfrac{P-12}{6}\Rightarrow P=9.6$ V.<br>
 Current toward $a$: $\dfrac{9.6-12}{6}=-0.4$ A, so $I_N=\mathbf{-0.4\,A}$ (0.4 A actually flows out of $a$).<br>
 With the 4 A and 5 Ω: total current into the 10 Ω ∥ 5 Ω pair is $4-0.4=3.6$ A, so $i=3.6\cdot\dfrac{10}{15}=\mathbf{2.4\,A}$.`},
{pid:"tut:9", src:"Tutorial 2 Q5 = Sadiku 4.57", q:R`Obtain the Thevenin and Norton equivalents at $a$–$b$ for Fig. 5 (VCCS $0.5v_x$).`,
 a:R`<b>Open circuit</b>, nodes $v_x$ and $v_a$:<br>
 $\dfrac{v_x-50}{3}+\dfrac{v_x}{6}+\dfrac{v_x-v_a}{2}=0,\qquad \dfrac{v_a-v_x}{2}-0.5v_x+\dfrac{v_a}{10}=0$<br>
 ⇒ $v_x=100$ V, $V_{Th}=v_a=\mathbf{166.7\,V}$.<br>
 <b>Short circuit</b> ($v_a=0$, 10 Ω shorted): $\dfrac{v_x-50}{3}+\dfrac{v_x}{6}+\dfrac{v_x}{2}=0\Rightarrow v_x=16.67$ V.<br>
 $i_{sc}=\dfrac{v_x}{2}+0.5v_x=16.67$ A $=I_N$.<br>
 $R_{Th}=R_N=\dfrac{166.7}{16.67}=\mathbf{10\,\Omega}$, &nbsp; $I_N=\mathbf{16.67\,A}$.`},
// ───────── Past papers ─────────
{pid:"pp:0", src:"2016 Q1 (10 marks)", q:R`Determine the nodal voltages $v_1,v_2,v_3$ and the current $i$ in Figure 1 (12 V source from $v_1$(+) to $v_3$, CCVS $2i$ from $v_1$(+) to $v_2$).`,
 a:R`Both sources sit between non-reference nodes, so $v_1,v_2,v_3$ form <b>one supernode</b>. The 2 Ω is inside it.<br>
 Constraints: $v_1-v_3=12$, &nbsp; $v_1-v_2=2i$, &nbsp; $i=v_3/4$.<br>
 KCL on the supernode: $\dfrac{v_1}{4}+\dfrac{v_2}{1}+\dfrac{v_3}{4}=0$.<br>
 Write everything in $v_3$: $v_1=v_3+12$, $v_2=v_1-\tfrac{v_3}{2}=\tfrac{v_3}{2}+12$.<br>
 $\tfrac{v_3+12}{4}+\tfrac{v_3}{2}+12+\tfrac{v_3}{4}=0\Rightarrow v_3=-15$ V.<br>
 $v_1=\mathbf{-3\,V},\ v_2=\mathbf{4.5\,V},\ v_3=\mathbf{-15\,V},\ i=\mathbf{-3.75\,A}$.`},
{pid:"pp:1", src:"2016 Q2 (10 marks) ≈ Sadiku 4.60", q:R`Find the Thevenin and Norton equivalents at $a$–$b$ for Figure 2.`,
 a:R`There are three branches in parallel between $a$ and $b$. Turn each into a Norton source pointing into $a$.<br>
 • Top: 3 A from $a$ to $b$ → <b>−3 A</b> into $a$.<br>
 • Bottom: 9 V (+ at $a$) in series with 3 Ω → <b>+3 A</b> into $a$, ∥ 3 Ω.<br>
 • Middle: 2 A ∥ 6 Ω → 12 V (+ on the $a$ side) in series with 6 Ω. With the 24 V and the other 6 Ω: 36 V in series with 12 Ω → <b>+3 A</b> into $a$, ∥ 12 Ω.<br>
 Total: $I_N=-3+3+3=\mathbf{3\,A}$ (into $a$), $R_N=R_{Th}=12\parallel3=\mathbf{2.4\,\Omega}$.<br>
 $V_{Th}=I_NR_N=\mathbf{7.2\,V}$ ($a$ positive). Check: nodal with $b=0$ gives $v_a=7.2$ V.`},
{pid:"pp:2", src:"2016 Q3 (5 marks) = Sadiku 4.86", q:R`A linear circuit drives a variable resistor $R$. Readings: $(R,V,i)=(2,3,1.5),(8,8,1.0),(14,10.5,0.75)$. Find $i$ when $R=6\,\Omega$ and the maximum power.`,
 a:R`Thevenin model: $V=V_{Th}-R_{Th}\,i$.<br>
 $3=V_{Th}-1.5R_{Th}$ and $8=V_{Th}-R_{Th}$ ⇒ $R_{Th}=10\,\Omega$, $V_{Th}=18$ V. Check: $18-10(0.75)=10.5$ ✓.<br>
 $R=6$: $i=\dfrac{18}{10+6}=\mathbf{1.125\,A}$.<br>
 $P_{max}=\dfrac{V_{Th}^2}{4R_{Th}}=\dfrac{324}{40}=\mathbf{8.1\,W}$ (at $R=10\,\Omega$).`},
{pid:"pp:3", src:"2017 Q1 (10 marks)", q:R`For Figure 1 (360 V, 30 Ω series, 150 Ω shunt, $R_L$): (a) $R_L$ for maximum power; (b) $P_{max}$; (c) % of the source power that reaches $R_L$.`,
 a:R`(a) $R_{Th}=30\parallel150=25\,\Omega$ ⇒ $R_L=\mathbf{25\,\Omega}$.<br>
 (b) $V_{Th}=360\cdot\dfrac{150}{180}=300$ V; $P_{max}=\dfrac{300^2}{4(25)}=\mathbf{900\,W}$.<br>
 (c) With $R_L=25\,\Omega$: $v_L=V_{Th}/2=150$ V. Currents: $R_L$ 6 A, 150 Ω 1 A, so the source supplies 7 A: $P_s=360\times7=2520$ W.<br>
 $\%=\dfrac{900}{2520}=\mathbf{35.7\%}$.`},
{pid:"pp:4", src:"2017 Q2 (8 marks)", q:R`By inspection, obtain the node-voltage equations for Figure 2.`,
 a:R`Diagonal = sum of conductances at the node. Off-diagonal = minus the shared conductance. RHS = source current into the node.<br>
 $v_1$: 1 Ω, 5 Ω, 10 Ω → $1.3$. $\ v_2$: 5 Ω → $0.2$, sources in: 1 A + 2 A. $\ v_3$: 1 Ω, 4 Ω → $1.25$, 1 A leaves. $\ v_4$: 4 Ω, 2 Ω → $0.75$, 3 A in.
 $$\begin{bmatrix}1.3&-0.2&-1&0\\-0.2&0.2&0&0\\-1&0&1.25&-0.25\\0&0&-0.25&0.75\end{bmatrix}\begin{bmatrix}v_1\\v_2\\v_3\\v_4\end{bmatrix}=\begin{bmatrix}0\\3\\-1\\3\end{bmatrix}$$
 (Not asked, but solving gives $v_1=12.35$, $v_2=27.35$, $v_3=10.59$, $v_4=7.53$ V.)`},
{pid:"pp:5", src:"2017 Q3 (12 marks)", q:R`Find $v_o$ in Figure 3 (193 V source; VCCS $0.4v_\Delta$, 0.5 A source, VCVS $0.8v_\theta$).`,
 a:R`Ground the bottom of the 193 V source. Top nodes A, B, C (after 4 Ω, 2.5 Ω, 2 Ω); bottom nodes D, E, F (after 6 Ω, 7.5 Ω, 8 Ω). $v_\Delta=B-C$, $v_\theta=D-E$, $v_o=A-D$.<br>
 A: $\frac{A-193}{4}+\frac{A-B}{2.5}-0.4v_\Delta=0$ &nbsp;&nbsp; D: $\frac{D}{6}+\frac{D-E}{7.5}+0.4v_\Delta=0$<br>
 B: $\frac{B-A}{2.5}+\frac{B-C}{2}-0.5=0$ &nbsp;&nbsp; E: $\frac{E-D}{7.5}+\frac{E-F}{8}+0.5=0$<br>
 Supernode C–F: $\frac{C-B}{2}+\frac{F-E}{8}=0$, &nbsp; $C-F=0.8v_\theta$<br>
 Solve: $A=185,\ B=155,\ C=130,\ D=12,\ E=102,\ F=202$ V ($v_\Delta=25$ V, $v_\theta=-90$ V).<br>
 $v_o=A-D=\mathbf{173\,V}$. Check at A: $-2+12-10=0$ ✓.`},
{pid:"pp:6", src:"2018 Q1 (11 marks) = Sadiku 4.67", q:R`Bridge with 40 V source (Figure 1): (a) $R_L$ for max power; (b) $P_{max}$; (c) % of the 40 V source power that reaches $R_L$.`,
 a:R`Take the source's − end as ground (left node = 40 V, right node = 0). $R_L$ connects the top and bottom nodes.<br>
 (a) Sources off: $80\parallel20+10\parallel90=16+9=25\,\Omega$ ⇒ $R_L=\mathbf{25\,\Omega}$.<br>
 (b) Open circuit: $v_{top}=40\cdot\frac{20}{100}=8$ V, $v_{bot}=40\cdot\frac{90}{100}=36$ V ⇒ $|V_{Th}|=28$ V.<br>
 $P_{max}=\dfrac{28^2}{4(25)}=\mathbf{7.84\,W}$.<br>
 (c) Put $R_L=25\,\Omega$ back and solve two nodes: $v_{top}=16.96$ V, $v_{bot}=30.96$ V.<br>
 Source current $=\frac{40-16.96}{80}+\frac{40-30.96}{10}=1.192$ A ⇒ $P_s=47.68$ W.<br>
 $\%=\dfrac{7.84}{47.68}=\mathbf{16.4\%}$.`},
{pid:"pp:7", src:"2018 Q2 (8 marks) = Sadiku 3.73", q:R`Write the mesh-current equations for Figure 2 by inspection.`,
 a:R`All clockwise. Self-resistances: $R_{11}=2+3+4=9$, $R_{22}=5+3=8$, $R_{33}=4+1+1=6$, $R_{44}=1+1=2$. Shared: 1–2: 3 Ω, 1–3: 4 Ω, 3–4: 1 Ω, 2–4: plain wire (0).<br>
 Sources (+ if they push clockwise): mesh 1 the 6 V → $+6$; mesh 2 the 4 V → $+4$; mesh 3 the 2 V → $+2$; mesh 4 the 3 V opposes → $-3$.
 $$\begin{bmatrix}9&-3&-4&0\\-3&8&0&0\\-4&0&6&-1\\0&0&-1&2\end{bmatrix}\begin{bmatrix}i_1\\i_2\\i_3\\i_4\end{bmatrix}=\begin{bmatrix}6\\4\\2\\-3\end{bmatrix}$$
 (Solving: $i_1=1.584$, $i_2=1.094$, $i_3=1.243$, $i_4=-0.879$ A.)`},
{pid:"pp:8", src:"2019 Q1 (6 marks)", q:R`Determine $R$ at dc for Figure 1.`,
 a:R`At dc the 2 mH inductor is a short and the 2 µF capacitor is an open.<br>
 The three 2 Ω in parallel give $\tfrac23\,\Omega$, in series with 4 Ω: $\tfrac{14}{3}\,\Omega$. That is in parallel with the lower 2 Ω: $\tfrac{14}{3}\parallel2=1.4\,\Omega$.<br>
 Add the 3 Ω: $R=1.4+3=\mathbf{4.4\,\Omega}$.`},
{pid:"pp:9", src:"2019 Q2 (12 marks)", q:R`Determine all node voltages and $I_x$ in Figure 2 by nodal analysis (CCVS of value $I_x$, 3 V and 5 V sources).`,
 a:R`Ground the bottom-right node. Then the right node is $+5$ V and, through the 3 V source, the middle node M is $2$ V. Unknowns: top-left TL, bottom-left BL, bottom-middle BM.<br>
 CCVS (+ at top): $TL-BL=I_x$ with $I_x=\dfrac{TL-2}{3}$ (through the 3 Ω into M).<br>
 BM: $\ \dfrac{BM-BL}{2}+\dfrac{BM}{1}+1=0$ (the 1 A leaves BM).<br>
 Supernode TL–BL: $\ -2+\dfrac{TL-2}{3}+\dfrac{BL-BM}{2}+\dfrac{BL}{5}=0$ (the 2 A enters TL).<br>
 Solve: $TL=\mathbf{2.871\,V}$, $BL=\mathbf{2.581\,V}$, $BM=\mathbf{0.194\,V}$, $M=2$ V, right node $5$ V.<br>
 $I_x=\dfrac{2.871-2}{3}=\mathbf{0.290\,A}$ (exactly $9/31$ A).`},
{pid:"pp:10", src:"2019 Q3 (10 marks)", q:R`Find $I_x$, $I_y$ and $V_x$ in Figure 3 by superposition (independent sources: −2 V and 11 A; dependent: $6I_x$, $2I_y$).`,
 a:R`Ground bottom-left. The $6I_x$ source is across the 1 Ω, so $I_y=6I_x$. The top source is −2 V with + on the left: $v_{TL}-v_{TR}=-2$. $I_x$ flows up the 2 Ω. KCL at bottom-right: $I_x$ leaves, while $2I_y$ and the 11 A arrive.<br>
 <b>−2 V only</b> (11 A open): $I_x'=2I_y'=12I_x'\Rightarrow I_x'=I_y'=0$. Then $v_{TL}=0$, $v_{TR}=2$, $v_{BR}=2$ ⇒ $V_x'=-2$ V.<br>
 <b>11 A only</b> (−2 V short): $I_x''=2I_y''+11=12I_x''+11\Rightarrow I_x''=-1$ A, $I_y''=-6$ A. $v_{TL}=v_{TR}=-6$, $v_{BR}=v_{TR}+2I_x''=-8$ ⇒ $V_x''=8$ V.<br>
 Total: $I_x=\mathbf{-1\,A}$, $I_y=\mathbf{-6\,A}$, $V_x=-2+8=\mathbf{6\,V}$.`},
{pid:"pp:11", src:"2019 Q4 (12 marks)", q:R`Find the Thevenin and Norton equivalents at $a$–$b$ (Figure 4) and the $R_L$ that receives maximum power.`,
 a:R`<b>$R_{Th}$</b>: 12 V → short, 0.2 A → open. The 1 kΩ/10 Ω branch then hangs off a dead end. From $a$: 120 Ω to ground; from $b$: 25 Ω to ground; 20 Ω between them.<br>
 $R_{Th}=20\parallel(120+25)=\mathbf{17.58\,\Omega}$.<br>
 <b>$V_{Th}$</b> (ground at the source's − end): the 0.2 A is injected into $a$.<br>
 $a:\ \dfrac{v_a-12}{120}+\dfrac{v_a-v_b}{20}=0.2,\qquad b:\ \dfrac{v_b-v_a}{20}+\dfrac{v_b}{25}=0$<br>
 ⇒ $v_a=9.818$ V, $v_b=5.455$ V, $V_{Th}=\mathbf{4.364\,V}$.<br>
 $I_N=V_{Th}/R_{Th}=\mathbf{0.248\,A}$, $R_N=17.58\,\Omega$.<br>
 Max power: $R_L=\mathbf{17.58\,\Omega}$ (then $P_{max}=\frac{4.364^2}{4(17.58)}=0.271$ W).`},
{pid:"pp:12", src:"2019 Q5 (12 marks)", q:R`A circuit with $I_s=24$ mA, $R_1=6$ kΩ, $R_2=1$ kΩ, $R_3=3$ kΩ has $V_{Th}=43.2$ V and $R_{Th}=2.1$ kΩ. Sketch the original circuit.`,
 a:R`Start from $R_{Th}$: $(R_1+R_2)\parallel R_3=7\parallel3=2.1$ kΩ ✓. So the terminals are across $R_3$, and $R_1$, $R_2$ are in series inside.<br>
 Put $I_s$ in parallel with $R_1$. Source transformation: $24\text{ mA}\times6\text{ kΩ}=144$ V in series with 6 kΩ.<br>
 Then $144$ V → $R_1$ → $R_2$ → $R_3$ (terminals across $R_3$): $V_{Th}=144\cdot\dfrac{3}{6+1+3}=43.2$ V ✓.<br>
 <b>Circuit:</b> $I_s\parallel R_1$, then $R_2$ in series, then $R_3$ across the output $a$–$b$.`},
{pid:"pp:13", src:"2020 A1 (5 marks)", q:R`Find the current $i$ through the 20 Ω resistor in Fig. A1 (24 V source; 150/50 Ω on each side with 150 Ω across the middle).`,
 a:R`Both sides divide the voltage in the same ratio (150:50), so the two middle nodes are at the same potential. This is a <b>balanced bridge</b> and the middle 150 Ω carries no current.<br>
 Each side is $150+50=200\,\Omega$, and $200\parallel200=100\,\Omega$.<br>
 $i=\dfrac{24}{20+100}=\mathbf{0.2\,A}$.`},
{pid:"pp:14", src:"2020 A2 (5 marks)", q:R`LED driver (Fig. A2): $v_{cs}=0.1$ V across the 0.05 Ω sense resistor. Find $i$ through the 4 Ω.`,
 a:R`$I_{LED}=\dfrac{0.1}{0.05}=2$ A.<br>
 KCL at the top node $V$: $\dfrac{10-V}{2}=\dfrac{V}{4}+2\Rightarrow 5-\tfrac V2=\tfrac V4+2\Rightarrow V=4$ V.<br>
 $i=\dfrac{4}{4}=\mathbf{1\,A}$.`},
{pid:"pp:15", src:"2020 A3 (5 marks)", q:R`Name two characteristics (properties) of an ideal op amp.`,
 a:R`Any two of these:<br>
 • Infinite open-loop gain, $A\to\infty$.<br>
 • Infinite input resistance, $R_i\to\infty$, so no current flows into either input: $i_1=i_2=0$.<br>
 • Zero output resistance, $R_o\to0$, so $v_o$ doesn't depend on the load.<br>
 • With negative feedback, $v_1=v_2$ (virtual short).`},
{pid:"pp:16", src:"2020 B4 (20 marks)", q:R`Norton equivalent left of $a$–$b$ in Fig. B4 (8 A, 2 Ω with $v_1$, 1 Ω in parallel with VCCS $v_1/2$). (a) $I_N$ (b) $R_N$ (c) draw it (d) $P_{max}$ in $R_L$.`,
 a:R`(a) Short $a$–$b$. KCL at the top node: $8=\dfrac{v_1}{2}+\dfrac{v_1}{1}+\dfrac{v_1}{2}\Rightarrow v_1=4$ V.<br>
 $I_N=\dfrac{v_1}{1}+\dfrac{v_1}{2}=\mathbf{6\,A}$.<br>
 (b) 8 A off, drive $a$ with a 1 A test source. All of it reaches the 2 Ω: $v_1=2$ V. Through the 1 Ω: $(v_t-v_1)-\tfrac{v_1}{2}=1\Rightarrow v_t=4$ V.<br>
 $R_N=\mathbf{4\,\Omega}$. (Check: open circuit gives $v_1=16$, $v_a=1.5v_1=24=I_NR_N$ ✓.)<br>
 (c) 6 A source (arrow towards $a$) in parallel with 4 Ω.<br>
 (d) $R_L=4\,\Omega$: $P_{max}=\dfrac{I_N^2R_N}{4}=\dfrac{36\times4}{4}=\mathbf{36\,W}$.`},
{pid:"pp:17", src:"2020 B5 (20 marks)", q:R`Bridge in Fig. B5 (100 V; 5 Ω/20 Ω left, 10 Ω/10 Ω right; 11 Ω load between $a$ and $b$). (a) $V_{Th}$ (b) $R_{Th}$ (c) $i_L$ (d) best load and $P_{max}$.`,
 a:R`(a) Load removed: $v_a=100\cdot\frac{20}{25}=80$ V, $v_b=100\cdot\frac{10}{20}=50$ V ⇒ $V_{Th}=\mathbf{30\,V}$.<br>
 (b) Source shorted: $5\parallel20+10\parallel10=4+5=\mathbf{9\,\Omega}$.<br>
 (c) $i_L=\dfrac{30}{9+11}=\mathbf{1.5\,A}$.<br>
 (d) $R=\mathbf{9\,\Omega}$, $P_{max}=\dfrac{30^2}{4\times9}=\mathbf{25\,W}$.`},
// ───────── Op amp ─────────
{pid:"oa:0", src:"Slide 5", q:R`State the properties of an ideal op amp and the two rules you use to analyse op-amp circuits.`,
 a:R`Ideal: $A=\infty$, $R_i=\infty$, $R_o=0$.<br>
 Rule 1: no current enters either input ($i_1=i_2=0$), because $R_i=\infty$.<br>
 Rule 2: the inputs sit at the same voltage ($v_1=v_2$), because a finite output needs $v_d=v_o/A\to0$. This needs negative feedback.<br>
 Real 741-type values: $A\approx2\times10^5$, $R_i\approx2$ MΩ, $R_o\approx50$–75 Ω, so the ideal model is a very good approximation.`},
{pid:"oa:1", src:"Slides 7–8 · Example 1", q:R`Non-ideal op amp with $A=2\times10^5$, $R_i=2$ MΩ, $R_o=50$ Ω in an inverting stage (10 kΩ in, 20 kΩ feedback). Find $v_o/v_s$ and $i$ when $v_s=2$ V.`,
 a:R`Replace the op amp with $R_i$ between the inputs and $Av_d$ behind $R_o$. Here $v_d=v_2-v_1=-v_1$.<br>
 Node 1: $\dfrac{v_s-v_1}{10\text{k}}=\dfrac{v_1}{2\text{M}}+\dfrac{v_1-v_o}{20\text{k}}\Rightarrow 200v_s=301v_1-100v_o$<br>
 Node 0: $\dfrac{v_1-v_o}{20\text{k}}=\dfrac{v_o-Av_d}{50}\Rightarrow v_1=-\dfrac{401}{80{,}000{,}000}v_o$<br>
 Substitute: $\dfrac{v_o}{v_s}=\mathbf{-1.99997}$. With $v_s=2$ V: $v_o=-3.99994$ V, $v_1=20.05\,\mu$V.<br>
 $i=\dfrac{v_1-v_o}{20\text{k}}\approx\mathbf{200\,\mu A}$.<br>
 The ideal formula gives $-R_f/R_i=-2$, so the error is only 0.0015%.`},
{pid:"oa:2", src:"Slide 9", q:R`Derive the closed-loop gain of the inverting amplifier using the ideal op-amp model.`,
 a:R`No current enters the − input, so $i_1=i_2$: $\ \dfrac{v_i-v_1}{R_i}=\dfrac{v_1-v_o}{R_f}$.<br>
 The + input is grounded and $v_1=v_2=0$ (virtual ground), so $\dfrac{v_i}{R_i}=-\dfrac{v_o}{R_f}$.<br>
 $$\frac{v_o}{v_i}=-\frac{R_f}{R_i}$$
 Example: $R_i=10$ kΩ, $R_f=20$ kΩ → gain $-2$ (slide 10).`},
// ───────── Sadiku Ch 1 ─────────
{pid:"s1:0", src:"Sadiku 1.13", q:R`$q=5\sin4\pi t$ mC enters the + terminal and $v=3\cos4\pi t$ V. (a) Power at $t=0.3$ s. (b) Energy from 0 to 0.6 s.`,
 a:R`$i=\dfrac{dq}{dt}=20\pi\cos4\pi t$ mA, so $p=vi=60\pi\cos^2 4\pi t$ mW.<br>
 (a) $\cos(1.2\pi)=-0.809$: $p=60\pi(0.6545)=\mathbf{123.4\,mW}$.<br>
 (b) $w=60\pi\displaystyle\int_0^{0.6}\cos^2 4\pi t\,dt=60\pi\Big[\tfrac t2+\tfrac{\sin8\pi t}{16\pi}\Big]_0^{0.6}=60\pi(0.3117)=\mathbf{58.76\,mJ}$.`},
{pid:"s1:1", src:"Sadiku 1.17", q:R`Five elements: $p_1=-205$ W, $p_2=60$ W, $p_4=45$ W, $p_5=30$ W. Find $p_3$.`,
 a:R`Conservation of power: $\sum p=0\Rightarrow -205+60+p_3+45+30=0$.<br>
 $p_3=\mathbf{70\,W}$ absorbed.`},
{pid:"s1:2", src:"Sadiku 1.19", q:R`Find $I$ and the power absorbed by each element in Fig. 1.30.`,
 a:R`KCL at the top node: $8=2+I\Rightarrow I=\mathbf{6\,A}$.<br>
 8 A source: current leaves its + terminal → $p=-9\times8=\mathbf{-72\,W}$ (supplies 72 W).<br>
 9 V element: $9\times2=\mathbf{18\,W}$. &nbsp; 3 V element: $3\times6=\mathbf{18\,W}$. &nbsp; 6 V source: $6\times6=\mathbf{36\,W}$.<br>
 Check: $-72+18+18+36=0$ ✓.`},
// ───────── Sadiku Ch 2 ─────────
{pid:"s2:0", src:"Sadiku 2.15", q:R`Calculate $v$ and $i_x$ in Fig. 2.79.`,
 a:R`Left loop (KVL): $-10+v+4=0\Rightarrow v=\mathbf{6\,V}$.<br>
 Right loop: $-4+16+3i_x=0\Rightarrow i_x=\mathbf{-4\,A}$.`},
{pid:"s2:1", src:"Sadiku 2.21", q:R`Find $V_x$ in Fig. 2.85 (15 V, 1 Ω, VCVS $2V_x$, 5 Ω, 2 Ω in one loop).`,
 a:R`One loop, current $i$ clockwise: $15=i(1+5+2)+2V_x$ with $V_x=5i$.<br>
 $15=8i+10i\Rightarrow i=0.833$ A, $V_x=\mathbf{4.167\,V}$.`},
{pid:"s2:2", src:"Sadiku 2.25", q:R`Find the current, voltage and power of the 20 kΩ resistor in Fig. 2.89.`,
 a:R`$V_o=5\text{ mA}\times10\text{ kΩ}=50$ V, so the VCCS gives $0.01V_o=0.5$ A.<br>
 It flows into $5\text{ k}\parallel20\text{ k}=4$ kΩ: $V=0.5\times4000=\mathbf{2\,kV}$.<br>
 $I_{20k}=\mathbf{0.1\,A}$, $P=\mathbf{200\,W}$.`},
{pid:"s2:3", src:"Sadiku 2.35", q:R`Calculate $V_o$ and $I_o$ in Fig. 2.99.`,
 a:R`The wire joins the two midpoints, so: top $70\parallel30=21\,\Omega$, bottom $20\parallel5=4\,\Omega$.<br>
 $V_o=200\cdot\dfrac{4}{25}=\mathbf{32\,V}$.<br>
 Current in the 70 Ω: $\frac{168}{70}=2.4$ A; in the 20 Ω: $\frac{32}{20}=1.6$ A ⇒ $I_o=2.4-1.6=\mathbf{0.8\,A}$.`},
{pid:"s2:4", src:"Sadiku 2.41", q:R`If $R_{eq}=50\,\Omega$ in Fig. 2.105, find $R$.`,
 a:R`$12\parallel12\parallel12=4\,\Omega$. The right branch is $10+R+4$, in parallel with 60 Ω, then the 30 Ω.<br>
 $50=30+60\parallel(14+R)\Rightarrow 60\parallel(14+R)=20\Rightarrow 14+R=30\Rightarrow R=\mathbf{16\,\Omega}$.`},
{pid:"s2:5", src:"Sadiku 2.43", q:R`Find $R_{ab}$ for each circuit in Fig. 2.107.`,
 a:R`(a) $5\parallel20=4$, $10\parallel40=8$ ⇒ $R_{ab}=\mathbf{12\,\Omega}$.<br>
 (b) $60\parallel20\parallel30=10$, plus 10 Ω $=20$, in parallel with 80: $R_{ab}=\mathbf{16\,\Omega}$.`},
{pid:"s2:6", src:"Sadiku 2.47", q:R`Find $R_{ab}$ in Fig. 2.111.`,
 a:R`The outer wire joins $c$ and $f$, so they are one node.<br>
 $d$ to $c/f$: $5\parallel20=4$; $e$ to $c/f$: $6\parallel3=2$.<br>
 $R_{ab}=10+4+2+8=\mathbf{24\,\Omega}$.`},
// ───────── Sadiku Ch 3 ─────────
{pid:"s3:0", src:"Sadiku 3.9", q:R`Determine $I_b$ in Fig. 3.58 using nodal analysis (CCVS $60I_b$).`,
 a:R`Nodes A (after 250 Ω) and B (before 150 Ω), joined by the CCVS: $v_A-v_B=60I_b$, with $I_b=\dfrac{24-v_A}{250}$.<br>
 Supernode: $I_b=\dfrac{v_A}{50}+\dfrac{v_B}{150}$.<br>
 ⇒ $v_A=4.165$ V, $v_B=-0.595$ V, $I_b=\mathbf{79.34\,mA}$.`},
{pid:"s3:1", src:"Sadiku 3.13", q:R`Calculate $v_1$ and $v_2$ in Fig. 3.62 using nodal analysis.`,
 a:R`Call the node between the 2 Ω and the 10 V source X. The source gives $v_X-v_2=10$, so {X, $v_2$} is a supernode.<br>
 Node 1: $\dfrac{v_1}{8}+\dfrac{v_1-v_X}{2}=0\Rightarrow v_X=1.25v_1$, so $v_2=1.25v_1-10$.<br>
 Supernode: $\dfrac{v_X-v_1}{2}+\dfrac{v_2}{4}=15\Rightarrow0.125v_1+0.3125v_1-2.5=15$.<br>
 $v_1=\mathbf{40\,V}$, $v_2=\mathbf{40\,V}$ (matches the key).`},
{pid:"s3:2", src:"Sadiku 3.19", q:R`Find $v_1,v_2,v_3$ in Fig. 3.68 using nodal analysis.`,
 a:R`$v_1:\ \frac{v_1}{4}+\frac{v_1-v_2}{8}+\frac{v_1-v_3}{2}+3=5$<br>
 $v_2:\ \frac{v_2}{2}+\frac{v_2-v_1}{8}+\frac{v_2-v_3}{4}=0$<br>
 $v_3:\ \frac{v_3-v_1}{2}-3+\frac{v_3-v_2}{4}+\frac{v_3-12}{8}=0$<br>
 ⇒ $v_1=\mathbf{10\,V},\ v_2=\mathbf{4.933\,V},\ v_3=\mathbf{12.27\,V}$.`},
{pid:"s3:3", src:"Sadiku 3.21", q:R`Find $v_1$ and $v_2$ in Fig. 3.70 (VCVS $3v_o$, with $v_o=v_2$).`,
 a:R`Let X be the node between the 2 kΩ and the $3v_o$ source: $v_2-v_X=3v_o=3v_2\Rightarrow v_X=-2v_2$.<br>
 Add the KCL at $v_1$ and at the supernode {X, $v_2$}: everything cancels except $3\text{ mA}=\dfrac{v_2}{1\text{k}}\Rightarrow v_2=\mathbf{3\,V}$.<br>
 Node 1: $3\text{m}=\dfrac{v_1+6}{2\text{k}}+\dfrac{v_1-3}{4\text{k}}\Rightarrow v_1=\mathbf{1\,V}$.`},
{pid:"s3:4", src:"Sadiku 3.23", q:R`Use nodal analysis to find $V_o$ in Fig. 3.72.`,
 a:R`Nodes $V_o$, $y$ (after 4 Ω) and $z$ (top of 16 Ω), with $y-z=2V_o$.<br>
 $V_o:\ \frac{V_o-30}{1}+\frac{V_o}{2}+\frac{V_o-y}{4}=0$<br>
 Supernode $\{y,z\}$: $\frac{y-V_o}{4}+\frac{z}{16}=3$<br>
 ⇒ $V_o=\mathbf{22.34\,V}$.`},
{pid:"s3:5", src:"Sadiku 3.49", q:R`Find $v_o$ and $i_o$ in Fig. 3.94.`,
 a:R`Left node L ($i_o=L/2$), node $v_o$, right node fixed at 27 V.<br>
 $L:\ \frac L2+\frac{L-v_o}{1}+\frac{L-27}{3}=0$<br>
 $v_o:\ \frac{v_o-L}{1}+\frac{v_o-27}{2}-2i_o=0$<br>
 ⇒ $L=36$ V: $v_o=\mathbf{57\,V}$, $i_o=\mathbf{18\,A}$.`},
{pid:"s3:6", src:"Sadiku 3.51", q:R`Apply mesh analysis to find $v_o$ in Fig. 3.96.`,
 a:R`The top window holds only the 5 A source, so its mesh current is 5 A. Lower-left $i_1$, lower-right $i_2$, both clockwise.<br>
 Mesh 1: $-40+1i_1+2(i_1-5)+4(i_1-i_2)=0\Rightarrow7i_1-4i_2=50$<br>
 Mesh 2: $4(i_2-i_1)+8i_2-20=0\Rightarrow-4i_1+12i_2=20$<br>
 ⇒ $i_1=10$ A, $i_2=5$ A, $v_o=4(i_1-i_2)=\mathbf{20\,V}$.`},
{pid:"s3:7", src:"Sadiku 3.67", q:R`Obtain the node-voltage equations for Fig. 3.111 by inspection, then solve for $V_o$.`,
 a:R`Nodes $N_1$ (top of 10 Ω), $N_2$ (top of 5 Ω), $N_3$ (top of 10 A); $V_o=N_2-N_3$.
 $$\begin{bmatrix}0.35&-0.25&0\\-0.25&0.95&-0.5\\0&-0.5&0.5\end{bmatrix}\begin{bmatrix}N_1\\N_2\\N_3\end{bmatrix}=\begin{bmatrix}3V_o-5\\0\\15\end{bmatrix}$$
 Row 3 alone: $0.5(N_3-N_2)=15\Rightarrow V_o=N_2-N_3=\mathbf{-30\,V}$ (the key prints 30 V without the sign).`},
{pid:"s3:8", src:"Sadiku 3.71", q:R`Write the mesh equations for Fig. 3.115 and find $i_1,i_2,i_3$.`,
 a:R`All clockwise; mesh 3 is top-right, mesh 2 bottom-right.
 $$\begin{bmatrix}9&-4&-5\\-4&7&-1\\-5&-1&9\end{bmatrix}\begin{bmatrix}i_1\\i_2\\i_3\end{bmatrix}=\begin{bmatrix}30\\-15\\0\end{bmatrix}$$
 ⇒ $i_1=\mathbf{6.256\,A},\ i_2=\mathbf{1.960\,A},\ i_3=\mathbf{3.693\,A}$.`},
// ───────── Sadiku Ch 4 ─────────
{pid:"s4:0", src:"Sadiku 4.5", q:R`Assume $v_o=1$ V and use linearity to find the actual $v_o$ in Fig. 4.73.`,
 a:R`With $v_o=1$: currents $\frac16$ (6 Ω) $+\frac16$ (2 Ω + 4 Ω) $=\frac13$ A through the 3 Ω, so the left node is $1+1=2$ V. Its 6 Ω takes $\frac13$ A, so the 2 Ω carries $\frac23$ A and $V_s=2+\frac43=3.333$ V.<br>
 Scale: $v_o=\dfrac{15}{3.333}=\mathbf{4.5\,V}$.`},
{pid:"s4:1", src:"Sadiku 4.13", q:R`Use superposition to find $v_o$ in Fig. 4.81.`,
 a:R`Nodal for each source alone (others killed):<br>
 2 A only: $v_o'=4.348$ V. &nbsp; 4 A only: $v_o''=6.957$ V. &nbsp; 12 V only: $v_o'''=-2.609$ V.<br>
 $v_o=4.348+6.957-2.609=\mathbf{8.696\,V}$.`},
{pid:"s4:2", src:"Sadiku 4.15", q:R`Use superposition to find $i$ (through the 3 Ω) in Fig. 4.83 and the power in the 3 Ω.`,
 a:R`20 V only: $i'=2.5$ A. &nbsp; 2 A only: $i''=0.375$ A. &nbsp; 16 V only: $i'''=-1$ A.<br>
 $i=\mathbf{1.875\,A}$, &nbsp; $P=i^2(3)=\mathbf{10.55\,W}$ (square the total, not the parts).`},
{pid:"s4:3", src:"Sadiku 4.17", q:R`Use superposition to find $v_x$ in Fig. 4.85.`,
 a:R`90 V only: $14.29$ V. &nbsp; 6 A only: $-17.14$ V. &nbsp; 40 V only: $-5.71$ V.<br>
 $v_x=\mathbf{-8.571\,V}$ (the key prints the magnitude).`},
{pid:"s4:4", src:"Sadiku 4.25", q:R`Obtain $v_o$ in Fig. 4.93 using source transformation.`,
 a:R`3 A ∥ 4 Ω → 12 V + 4 Ω; 2 A ∥ 9 Ω → 18 V + 9 Ω; 6 A ∥ 5 Ω → 30 V + 5 Ω. The circuit becomes one loop with the 30 V source and the 2 Ω.<br>
 Going round: $-12+18+30+30=I(4+9+5+2)\Rightarrow I=3.3$ A, flowing right-to-left through the 2 Ω.<br>
 $v_o=\mathbf{-6.6\,V}$ (+ end is the lower one; the key prints 6.6 V).`},
{pid:"s4:5", src:"Sadiku 4.33", q:R`Find the Thevenin equivalent seen by the 5 Ω in Fig. 4.101, then the current in it.`,
 a:R`$R_{Th}=10+10=20\,\Omega$, $V_{Th}=4\times10=40$ V.<br>
 $I=\dfrac{40}{20+5}=\mathbf{1.6\,A}$.`},
{pid:"s4:6", src:"Sadiku 4.37", q:R`Find the Norton equivalent at $a$–$b$ in Fig. 4.104.`,
 a:R`$R_N=12\parallel(20+40)=\mathbf{10\,\Omega}$.<br>
 Short $a$–$b$. KCL at the node X between 20 Ω and the 40 Ω/2 A pair: $\frac{120-X}{20}+2=\frac{X}{40}\Rightarrow X=106.7$ V.<br>
 $I_N=\frac{X}{40}-2=\mathbf{0.667\,A}$.`},
{pid:"s4:7", src:"Sadiku 4.47", q:R`Thevenin and Norton equivalents at $a$–$b$ for Fig. 4.114 (VCCS $2V_x$).`,
 a:R`Open: $\frac{V_x-30}{12}+\frac{V_x}{60}+2V_x=0\Rightarrow V_x=\mathbf{1.190\,V}=V_{Th}$.<br>
 Short ($V_x=0$, so the VCCS is off): $I_N=\frac{30}{12}=\mathbf{2.5\,A}$.<br>
 $R_{Th}=\frac{1.190}{2.5}=\mathbf{0.476\,\Omega}$.`},
{pid:"s4:8", src:"Sadiku 4.53", q:R`Find the Norton equivalent at $a$–$b$ in Fig. 4.119.`,
 a:R`Open: node $a$: $\frac{v_a-v_o}{2}+0.25v_o=0\Rightarrow v_a=0.5v_o$. Middle node: $\frac{v_o-18}{6}+\frac{v_o}{3}+\frac{v_o-v_a}{2}-0.25v_o=0\Rightarrow v_o=6$ V, $V_{oc}=3$ V.<br>
 Short: $\frac{v_o-18}{6}+\frac{v_o}{3}+\frac{v_o}{2}-0.25v_o=0\Rightarrow v_o=4$ V; $I_N=\frac{v_o}{2}-0.25v_o=\mathbf{1\,A}$.<br>
 $R_N=\frac{3}{1}=\mathbf{3\,\Omega}$.`},
{pid:"s4:9", src:"Sadiku 4.63", q:R`Find the Norton equivalent of Fig. 4.129 (no independent sources).`,
 a:R`No independent source ⇒ $I_N=\mathbf{0}$.<br>
 Drive $a$ with 1 A. Left node: $\frac{v_o-v_a}{10}+\frac{v_o}{20}=0\Rightarrow v_o=\tfrac23v_a$.<br>
 Node $a$: $1+0.5v_o=\frac{v_a-v_o}{10}\Rightarrow v_a=-3.333$ V.<br>
 $R_N=\mathbf{-3.333\,\Omega}$. A dependent source can make $R_{Th}$ negative.`},
{pid:"s4:10", src:"Sadiku 4.65", q:R`Find the relationship between $V_o$ and $I_o$ in Fig. 4.131.`,
 a:R`Thevenin seen by the load: $V_{Th}=32\cdot\frac{12}{16}=24$ V, $R_{Th}=4\parallel12+2=5\,\Omega$.<br>
 $V_o=\mathbf{24-5I_o}$.`},
{pid:"s4:11", src:"Sadiku 4.71", q:R`What resistor across $a$–$b$ in Fig. 4.137 absorbs maximum power, and what is that power?`,
 a:R`Left side: $v_o=8\cdot\frac{1}{4}=2$ V, so the VCVS is $120v_o=240$ V.<br>
 $V_{Th}=240\cdot\frac{40}{50}=192$ V (magnitude), $R_{Th}=10\text{k}\parallel40\text{k}=\mathbf{8\,k\Omega}$.<br>
 $P_{max}=\dfrac{192^2}{4(8000)}=\mathbf{1.152\,W}$.`},
{pid:"s4:12", src:"Sadiku 4.73", q:R`Find the maximum power deliverable to $R$ in Fig. 4.139.`,
 a:R`$R_{Th}=10\parallel20+25\parallel5=6.667+4.167=10.83\,\Omega$.<br>
 $V_{Th}=60\cdot\frac{20}{30}-60\cdot\frac{5}{30}=40-10=30$ V.<br>
 $P_{max}=\dfrac{30^2}{4(10.83)}=\mathbf{20.77\,W}$.`},
{pid:"s4:13", src:"Sadiku 4.83", q:R`Terminal readings: 12 V at 0 A, and 0 V at 1.5 A. Find the Thevenin equivalent.`,
 a:R`$V_{Th}=v_{oc}=\mathbf{12\,V}$, $I_N=i_{sc}=1.5$ A ⇒ $R_{Th}=\frac{12}{1.5}=\mathbf{8\,\Omega}$.`},
{pid:"s4:14", src:"Sadiku 4.85", q:R`With a 10 kΩ load, $V_{ab}=6$ V; with 30 kΩ, $V_{ab}=12$ V. (a) Thevenin equivalent. (b) $V_{ab}$ with 20 kΩ.`,
 a:R`$6=V_{Th}\frac{10}{10+R}$ and $12=V_{Th}\frac{30}{30+R}$ (R in kΩ).<br>
 From the first, $V_{Th}=6+0.6R$. Then $360+12R=30(6+0.6R)\Rightarrow R=30$ kΩ.<br>
 (a) $V_{Th}=\mathbf{24\,V}$, $R_{Th}=\mathbf{30\,k\Omega}$. &nbsp; (b) $24\cdot\frac{20}{50}=\mathbf{9.6\,V}$.`},
];
