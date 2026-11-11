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
 "ty:0":["ty_1_9"],"ty:1":["ty_1_16"],"ty:2":["ty_2_7"],"ty:3":["ty_2_13"],"ty:4":["ty_2_49"],"ty:5":["ty_2_68"],"ty:6":["ty_4_6"],"ty:7":["ty_4_31"],
 "s4:8":["s4_53"],"s4:9":["s4_63"],"s4:10":["s4_65"],"s4:11":["s4_71"],"s4:12":["s4_73"],"s4:14":["s4_85"],
 "fpp:0":["f16_4"], "fpp:1":["f16_5"], "fpp:2":["f16_6"], "fpp:3":["f16_10"], "fpp:4":["f16_11"], "fpp:6":["f17_5"], "fpp:7":["f17_6"], "fpp:8":["f17_7"], "fpp:9":["f17_9"], "fpp:10":["f18_3"], "fpp:11":["f18_4"], "fpp:12":["f18_6"], "fpp:13":["f18_7"], "fpp:14":["f19_6"], "fpp:15":["f19_7"], "fpp:16":["f19_8"], "fpp:17":["f19_9"], "fpp:18":["f19_10"], "fpp:20":["f20_b1"], "fpp:21":["f20_b2"], "fpp:22":["f20_b3"],
 "sp3:0":["sp3_1"], "sp3:1":["sp3_2"], "sp3:2":["sp3_3","sp3_3b"], "sp3:3":["sp3_4","sp3_4b"], "sp3:4":["sp3_5"], "sp3:5":["sp3_5"], "c5:0":["c5_13"], "c5:1":["c5_17"], "c5:2":["c5_19"], "c5:3":["c5_21"], "c5:4":["c5_25"], "c5:5":["c5_27"], "c5:6":["c5_31"], "c5:7":["c5_33"], "c5:8":["c5_37"], "c5:9":["c5_39"], "c5:10":["c5_47"], "c5:12":["c5_61"], "c5:13":["c5_65"], "c6:3":["c6_17","c6_17b","c6_17c"], "c6:4":["c6_19"], "c6:5":["c6_21"], "c6:9":["c6_49"], "c6:10":["c6_51"], "c6:11":["c6_53"], "c6:12":["c6_61"], "c7:1":["c7_3"], "c7:2":["c7_9"], "c7:3":["c7_11"], "c7:5":["c7_17"], "c7:6":["c7_19"], "c7:8":["c7_39"], "c7:9":["c7_43"], "c7:10":["c7_45"], "c7:11":["c7_53","c7_53b"], "c7:12":["c7_59"], "c7:13":["c7_61"], "c7:14":["c7_63"], "c7:15":["c7_71"], "c8:0":["c8_1"], "c8:1":["c8_5"], "c8:4":["c8_13"], "c8:6":["c8_23"], "c8:8":["c8_31"], "c8:9":["c8_43"], "c8:10":["c8_45"], "c8:11":["c8_47"], "c8:12":["c8_49"],
};
// Post-midterm practice questions inside the Quiz 2 scope (Lectures 1–6, diodes up to slide 24)
const Q2PRAC = ["fpp:1","fpp:3","fpp:4","fpp:5","fpp:14","fpp:15","fpp:17","fpp:18","fpp:21"];
// In Quiz 2 scope? Post-midterm past-paper items are listed above; Sadiku Ch 6–8 sets are finals-only.
const inQ2 = pid => pid.startsWith("fpp:") ? Q2PRAC.includes(pid) : !/^c[678]:/.test(pid);
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
// ───────── Extra question types from the supplementary PDF ─────────
{pid:"ty:0", src:"Sadiku 1.9 · charge from a graph", q:R`The current through an element is shown in Fig. 1.26. Find the total charge that has passed at (a) $t=1$ s, (b) $t=3$ s, (c) $t=5$ s.`,
 a:R`$q=\int i\,dt$ is the area under the graph.<br>
 • 0–1 s: $10\times1=10$ C.<br>
 • 1–2 s: trapezoid $\tfrac{10+5}{2}\times1=7.5$ C. 2–3 s: $5\times1=5$ C.<br>
 • 3–4 s: $5\times1=5$ C. 4–5 s: triangle $\tfrac12(5)(1)=2.5$ C.<br>
 (a) $\mathbf{10\,C}$ &nbsp; (b) $10+7.5+5=\mathbf{22.5\,C}$ &nbsp; (c) $22.5+5+2.5=\mathbf{30\,C}$.`},
{pid:"ty:1", src:"Sadiku 1.16 · power and energy from graphs", q:R`Fig. 1.27 shows the current through and the voltage across an element. (a) Sketch the power for $t>0$. (b) Find the total energy absorbed for $0<t<4$ s.`,
 a:R`$p=vi$, piece by piece:<br>
 • 0–2 s: $i=30t$ mA, $v=5$ V ⇒ $p=150t$ mW, a ramp from 0 to 300 mW.<br>
 • 2–4 s: $i=30(4-t)$ mA, $v=-5$ V ⇒ $p=-150(4-t)$ mW, a ramp from −300 mW up to 0.<br>
 Energy = area under $p$: $+\tfrac12(2)(300)=300$ mJ, then $-\tfrac12(2)(300)=-300$ mJ.<br>
 Total $=\mathbf{0\,J}$: the element stores energy for 2 s and gives it all back.`},
{pid:"ty:2", src:"Sadiku 2.7 · branches and nodes", q:R`Determine the number of branches and nodes in the circuit of Fig. 2.71.`,
 a:R`A branch is one two-terminal element; a node is a point where two or more branches meet (a plain wire is the same node).<br>
 • Branches: 12 V, 1 Ω, 4 Ω, 8 Ω, 5 Ω, 2 A ⇒ $b=\mathbf{6}$.<br>
 • Nodes: top of the 12 V source (left end of 1 Ω); the 1 Ω–4 Ω–8 Ω junction; the 4 Ω–5 Ω–2 A junction; the bottom wire ⇒ $n=\mathbf{4}$.<br>
 Check: $b=l+n-1\Rightarrow l=3$ independent loops.`},
{pid:"ty:3", src:"Sadiku 2.13 · KCL on a diagram", q:R`For the circuit in Fig. 2.77, use KCL to find the branch currents $I_1$ to $I_4$.`,
 a:R`Work from the right-hand node, where only one current is unknown.<br>
 • Right node: 2 A comes in along the top; 4 A and $I_4$ (arrow points away, to the left) leave. $2=4+I_4\Rightarrow I_4=\mathbf{-2\,A}$.<br>
 • Node between 7 A and $I_3$: $7+I_4=I_3\Rightarrow I_3=\mathbf{5\,A}$.<br>
 • Node above the 3 A: 7 A and 3 A leave, and $I_2$ (arrow points left) leaves too: $0=7+3+I_2\Rightarrow I_2=\mathbf{-10\,A}$.<br>
 • Left node: $I_1+I_2=2\Rightarrow I_1=\mathbf{12\,A}$.<br>
 Check: the bottom wire carries $3+5+4=12$ A, matching $I_1$.<br>
 The answer key prints 12, 10, 5, 2 because it drops minus signs.`},
{pid:"ty:4", src:"Sadiku 2.49 · Δ → Y", q:R`Transform the circuits in Fig. 2.113 from Δ to Y.`,
 a:R`Each Y resistor = (product of the two Δ resistors that touch its terminal) ÷ (sum of the three Δ resistors).<br>
 (a) All three Δ resistors are 12 Ω: $R_Y=\dfrac{12\cdot12}{36}=\mathbf{4\,\Omega}$ each.<br>
 (b) $R_{ab}=60$, $R_{ac}=30$, $R_{bc}=10$, sum $=100$:<br>
 $R_a=\dfrac{60\cdot30}{100}=\mathbf{18\,\Omega}$, &nbsp; $R_b=\dfrac{60\cdot10}{100}=\mathbf{6\,\Omega}$, &nbsp; $R_c=\dfrac{30\cdot10}{100}=\mathbf{3\,\Omega}$.<br>
 Check by going back to Δ: $R_{ab}=\dfrac{18\cdot6+6\cdot3+3\cdot18}{3}=60$ ✓.`},
{pid:"ty:5", src:"Sadiku 2.68 · ammeter loading", q:R`(a) Find $I$ in Fig. 2.128(a). (b) An ammeter with 1 Ω internal resistance is inserted as in (b). What is $I'$? (c) Find the percentage error $\left|\dfrac{I-I'}{I}\right|\times100\%$.`,
 a:R`(a) $40\parallel60=24\,\Omega$, so $I=\dfrac{4}{16+24}=\mathbf{0.1\,A}$.<br>
 (b) The meter adds 1 Ω in series: $I'=\dfrac{4}{41}=\mathbf{97.56\,mA}$.<br>
 (c) Error $=\dfrac{0.1-0.09756}{0.1}\times100=\mathbf{2.44\%}$.<br>
 Same idea with a Thevenin view: error $=\dfrac{R_{meter}}{R_{Th}+R_{meter}}=\dfrac{1}{41}$, where $R_{Th}=40\,\Omega$ is what the meter sits in series with.`},
{pid:"ty:6", src:"Sadiku 4.6 · linearity table", q:R`For the linear circuit in Fig. 4.74, use linearity to complete the table.`,
 a:R`One independent source ⇒ $V_o=kV_s$. From experiment 1, $k=\dfrac{4}{12}=\dfrac13$.<br>
 • Experiment 2: $V_o=16$ V ⇒ $V_s=16\cdot3=\mathbf{48\,V}$.<br>
 • Experiment 3: $V_s=1$ V ⇒ $V_o=\mathbf{0.333\,V}$.<br>
 • Experiment 4: $V_o=-2$ V ⇒ $V_s=\mathbf{-6\,V}$.<br>
 This only works with a single independent source; with several, use superposition.`},
{pid:"ty:7", src:"Sadiku 4.31 · source transformation with a dependent source", q:R`Determine $v_x$ in Fig. 4.99 using source transformation.`,
 a:R`Call the top of the 8 Ω resistor node $N$ (ground at the bottom).<br>
 • 12 V in series with 3 Ω ⇒ 4 A source into $N$, in parallel with 3 Ω.<br>
 • $2v_x$ in series with 6 Ω ⇒ $2v_x/6=v_x/3$ source into $N$, in parallel with 6 Ω.<br>
 The controlling variable $v_x$ is the voltage across the <i>original</i> 3 Ω, so it stays $v_x=12-v_N$ (don't replace it by $v_N$).<br>
 KCL at $N$: $4+\dfrac{v_x}{3}=v_N\left(\dfrac13+\dfrac18+\dfrac16\right)$ ⇒ $4+4-\dfrac{v_N}{3}=0.625\,v_N$ ⇒ $v_N=8.348$ V.<br>
 $v_x=12-8.348=\mathbf{3.652\,V}$ (matches the answer key).`},
// ───────── Finals: past-paper questions since the midterm (pid fpp:N) ─────────
{pid:"fpp:0", src:"2016 Q4 (5 marks)", q:R`Find the equivalent capacitance across terminals a–b in the network of Figure 4 (six equal capacitors $C$, three jumper wires).`,
 a:R`Name the nodes along the chain $a,n_1,n_2,n_3,n_4,n_5,b$. The jumpers join $a=n_2$, $n_1=n_3$ and $n_3=n_5$. So there are only three useful nodes: $A=\{a,n_2\}$, $X=\{n_1,n_3,n_5\}$, and $b$ (plus the floating $n_4$).<br>
 • $C_1$, $C_2$, $C_3$ all sit between $A$ and $X$ ⇒ $3C$ in parallel.<br>
 • $C_4$ and $C_5$ both go from $X$ to $n_4$, which connects to nothing else ⇒ they carry no charge from a to b. Ignore them.<br>
 • $C_6$ is between $X$ and $b$.<br>
 $C_{eq}=\dfrac{3C\cdot C}{3C+C}=\mathbf{\tfrac34C}$.`},
{pid:"fpp:1", src:"2016 Q5 (15 marks)", q:R`The op-amp circuit in Figure 5 is a Howland current pump. Find the relation between $V_{in}$ and $i_L$, and explain why it is called a "current pump".`,
 a:R`Let the load node (top of $R_L$, also the + input) be $v_L$.<br>
 • − input: $R$ to ground and $R$ to $v_o$ form a divider, so $v_-=v_o/2$. Ideal op amp: $v_+=v_-$ ⇒ $v_L=v_o/2$, i.e. $v_o=2v_L$.<br>
 • KCL at the load node (no current into the + input): $\dfrac{V_{in}-v_L}{R}+\dfrac{v_o-v_L}{R}=i_L$<br>
 ⇒ $\dfrac{V_{in}-v_L+2v_L-v_L}{R}=i_L$ ⇒ $\mathbf{i_L=V_{in}/R}$.<br>
 $R_L$ has dropped out: the load current is set by $V_{in}$ alone, whatever the load. The circuit behaves as a voltage-controlled current source that "pumps" a fixed current into any load (while the op amp stays out of saturation).`},
{pid:"fpp:2", src:"2016 Q6 (10 marks)", q:R`Given that $v(t)=V$ (constant), find $i_o(t)$ for the circuit in Figure 6. The switch closes at $t=0$ and the capacitor starts uncharged.`,
 a:R`It's an integrator with $RC=(1\,\text{k}\Omega)(1\,\text{mF})=1$ s.<br>
 $v_o(t)=-\dfrac1{RC}\int_0^t V\,d\tau=-Vt$ volts.<br>
 $i_o(t)=\dfrac{v_o}{10}=\mathbf{-0.1\,V\,t}$ A for $t\ge0$ (a ramp), until $v_o$ reaches the negative supply rail and the op amp saturates.`},
{pid:"fpp:3", src:"2016 Q10 (10 marks)", q:R`Determine the transfer function $V_o/V_i$ for the circuit in Figure 10. Use the ideal diode model.`,
 a:R`Top branch: $D_1$ points toward the output and its battery drops $V$ in that direction, so it conducts when $V_i-V>V_o$. Bottom branch: $D_2$ points toward the input and its battery drops $V$ going right-to-left, so it conducts when $V_o-V>V_i$.<br>
 • $V_i>V$: $D_1$ ON, $D_2$ OFF ⇒ $V_o=V_i-V$.<br>
 • $-V\le V_i\le V$: neither branch can push current, $V_o=0$.<br>
 • $V_i<-V$: $D_2$ ON ⇒ $V_o=V_i+V$.<br>
 Transfer curve: a dead zone of width $2V$ around the origin, then slope-1 lines on either side, i.e. $V_o=\mathbf{\operatorname{sign}(V_i)\,\max(|V_i|-V,0)}$.`},
{pid:"fpp:4", src:"2016 Q11 (10 marks)", q:R`Use the small-signal model to find the change in $V_{out}$ for a 1 V change in $V_{in}$. $R$ is chosen so that $V_{out}=0.7$ V (two diodes in series to ground).`,
 a:R`DC: $I_D=\dfrac{V_{in}-0.7}{R}$; each diode has $r_d=V_T/I_D$, so the stack is $2r_d$.<br>
 Small signal: $\Delta V_{out}=\Delta V_{in}\dfrac{2r_d}{R+2r_d}=\Delta V_{in}\dfrac{2V_T}{I_DR+2V_T}=\Delta V_{in}\dfrac{2V_T}{V_{in}-0.7+2V_T}$.<br>
 $R$ cancels out. The paper doesn't print $V_{in}$; with e.g. $V_{in}=5$ V and $V_T=26$ mV: $\Delta V_{out}=\dfrac{0.052}{4.3+0.052}\times1\text{ V}\approx\mathbf{12\,mV}$. In the exam, state the $V_{in}$ you assume.`},
{pid:"fpp:5", src:"2017 Q4 (9 marks)", q:R`(a) Design a difference amplifier with $v_o=8(v_b-v_a)$ using an ideal op amp and ±8 V supplies. (b) With $v_a=1$ V, what range of $v_b$ keeps the op amp linear?`,
 a:R`(a) Use the balanced difference amp: $v_a$ through $R_1$ to the − input, $R_2$ feedback; $v_b$ through $R_3$ to the + input with $R_4$ to ground. Need $R_2/R_1=8$ and $R_1/R_2=R_3/R_4$.<br>
 E.g. $R_1=R_3=\mathbf{10\,k\Omega}$, $R_2=R_4=\mathbf{80\,k\Omega}$.<br>
 (b) $v_o=8v_b-8$. Linear while $-8\le8v_b-8\le8$ ⇒ $\mathbf{0\le v_b\le2\,V}$.`},
{pid:"fpp:6", src:"2017 Q5 (10 marks)", q:R`(a) Find $C_{eq}$ in Figure 4(a). (b) Find $L_{eq}$ in Figure 4(b). All capacitors are $C$, all inductors $L$.`,
 a:R`(a) Nodes: $T$ (top terminal), $M$ (bottom terminal / bottom middle), $P$ (top right), $Q$ (right tip). Capacitors: $T$–$P$, $T$–$M$, $P$–$M$, $P$–$Q$, $M$–$Q$.<br>
 $P$–$Q$–$M$ in series: $C/2$; parallel with $P$–$M$: $1.5C$; in series with $T$–$P$: $\dfrac{C\cdot1.5C}{2.5C}=0.6C$; parallel with $T$–$M$: $C_{eq}=\mathbf{1.6\,C}$.<br>
 (b) The left arc is a wire joining the top-left corner, the left end of the middle row and the bottom-left (one node, the left terminal). Same on the right. So three inductors join the left node to the middle-left node $C$ ⇒ $L/3$; one inductor $C$–$D$; three join $D$ to the right node ⇒ $L/3$. Series: $L/3+L+L/3=5L/3$. In parallel with the top inductor (left node to right node):<br>
 $L_{eq}=\dfrac{(5L/3)L}{5L/3+L}=\mathbf{\tfrac58L}$.`},
{pid:"fpp:7", src:"2017 Q6 (12 marks)", q:R`In Figure 5, $i_1(t)=0.6e^{-2t}$ A (6 H) and $i(0)=1.4$ A. Find (a) $i_2(0)$, $i_2(t)$, $i(t)$; (b) $v_1(t)$, $v_2(t)$, $v(t)$.`,
 a:R`(a) $i_2(0)=i(0)-i_1(0)=1.4-0.6=\mathbf{0.8\,A}$.<br>
 $v_1=6\dfrac{di_1}{dt}=6(-1.2e^{-2t})=-7.2e^{-2t}$ V (same across the 3 H).<br>
 $i_2=0.8+\dfrac13\int_0^t(-7.2e^{-2\tau})d\tau=0.8-1.2(1-e^{-2t})=\mathbf{-0.4+1.2e^{-2t}\,A}$.<br>
 $i=i_1+i_2=\mathbf{-0.4+1.8e^{-2t}\,A}$.<br>
 (b) $v_1=\mathbf{-7.2e^{-2t}\,V}$, $v_2=8\dfrac{di}{dt}=\mathbf{-28.8e^{-2t}\,V}$, $v=v_1+v_2=\mathbf{-36e^{-2t}\,V}$.<br>
 Check: $L_{eq}=2+8=10$ H and $10\,di/dt=-36e^{-2t}$ ✓.`},
{pid:"fpp:8", src:"2017 Q7 (13 marks)", q:R`Parallel RLC, $L=50$ mH, $C=0.2\,\mu$F. (a) Roots for $R=200\,\Omega$; (b) damping type; (c) repeat for $R=312.5\,\Omega$; (d) $R$ for critical damping.`,
 a:R`$\omega_0=1/\sqrt{LC}=1/\sqrt{10^{-8}}=10^4$ rad/s; $\alpha=1/(2RC)$.<br>
 (a,b) $R=200$: $\alpha=12\,500>\omega_0$ ⇒ $s=-12\,500\pm\sqrt{12\,500^2-10^8}=-12\,500\pm7500$ ⇒ $\mathbf{-5000,\,-20\,000}$ s⁻¹, <b>overdamped</b>.<br>
 (c) $R=312.5$: $\alpha=8000<\omega_0$ ⇒ $s=\mathbf{-8000\pm j6000}$, <b>underdamped</b>.<br>
 (d) $\alpha=\omega_0$ ⇒ $R=\dfrac1{2\omega_0C}=\dfrac1{2(10^4)(0.2\times10^{-6})}=\mathbf{250\,\Omega}$.`},
{pid:"fpp:9", src:"2017 Q9 (10 marks)", q:R`At the instant the switch reaches terminal a, the 0.1 µF capacitor has 5 V (+ on the input side). After 9 ms the switch moves to b. How long after reaching b does the op amp (±6 V rails) saturate?`,
 a:R`$RC=(100\text{ k})(0.1\,\mu)=10$ ms. The + input is grounded so $v_-=0$, and $v_o=-5$ V at the start.<br>
 Terminal a is −10 V (the source's + is at the bottom): $v_o=-5-\dfrac{1}{0.01}\int_0^t(-10)d\tau=-5+1000t$. At 9 ms: $v_o=4$ V (still linear).<br>
 Terminal b is +8 V: $v_o=4-800t'$. Saturates at −6 V: $4-800t'=-6$ ⇒ $t'=\mathbf{12.5\,ms}$.`},
{pid:"fpp:10", src:"2018 Q3 (8 marks)", q:R`Find $v_o$ when a dc input of 2.5 mV is applied at $t=0$ to the integrator in Figure 3 (100 kΩ, 20 µF, capacitor initially uncharged).`,
 a:R`$RC=(100\times10^3)(20\times10^{-6})=2$ s.<br>
 $v_o=-\dfrac1{RC}\int_0^t2.5\,\text{mV}\,d\tau=\mathbf{-1.25\,t\ mV}$ (until saturation).`},
{pid:"fpp:11", src:"2018 Q4 (16 marks)", q:R`(a) Design an analog computer to simulate $\dfrac{d^2v}{dt^2}+5v=-2f(t)$. (b) Find $L_{eq}$ in Figure 4.`,
 a:R`(a) $\dfrac{d^2v}{dt^2}=-2f(t)-5v$.<br>
 • Stage 1, summing integrator with inputs $f$ and $v$: $-\int(2f+5v)dt=\dfrac{dv}{dt}$. With $C=1\,\mu$F: $R_f=\dfrac{1}{2C}=500$ kΩ, $R_v=\dfrac1{5C}=200$ kΩ.<br>
 • Stage 2, integrator ($R=1$ MΩ, $C=1\,\mu$F): input $dv/dt$, output $-v$.<br>
 • Stage 3, unity inverter (two equal resistors): $-v\to v$, fed back to the 200 kΩ input of stage 1. Initial conditions go on the two capacitors.<br>
 (b) The outer rectangle is one node $K$. Left node $P$: two inductors to $K$ ⇒ $L/2$. Right node $Q$: two inductors to $K$ ⇒ $L/2$. Between the terminals $P$ and $Q$: $L\parallel(L/2+L/2)=L\parallel L=\mathbf{L/2}$.`},
{pid:"fpp:12", src:"2018 Q6 (12 marks)", q:R`$S_1$ closes at $t=0$, $S_2$ (shorting the 20 Ω) closes at $t=2$ s. Find $i(t)$ for all $t$, and $i(1)$, $i(3)$.`,
 a:R`$t<0$: $i=0$. Source transform: 6 A ∥ 15 Ω = 90 V behind 15 Ω.<br>
 $0<t<2$: $R=15+10+20=45\,\Omega$, $i(\infty)=2$ A, $\tau=5/45=1/9$ s ⇒ $i=\mathbf{2(1-e^{-9t})}$ A. $i(1)=\mathbf{2.00\,A}$ (1.9998), $i(2)\approx2$ A.<br>
 $t>2$: $R=25\,\Omega$, $i(\infty)=3.6$ A, $\tau=0.2$ s ⇒ $i=\mathbf{3.6-1.6e^{-5(t-2)}}$ A. $i(3)=3.6-1.6e^{-5}=\mathbf{3.589\,A}$.`},
{pid:"fpp:13", src:"2018 Q7 (15 marks)", q:R`Parallel RLC: 0.125 µF, 8 H, 20 kΩ; $V_0=0$, $I_0=-12.25$ mA. (a) roots; (b) $v$ and $dv/dt$ at $0^+$; (c) $v(t)$; (d) sketch for 0–11 ms.`,
 a:R`(a) $\alpha=\dfrac1{2RC}=\dfrac1{2(20\text{k})(0.125\mu)}=200$; $\omega_0^2=\dfrac1{LC}=10^6$. $s=-200\pm j\sqrt{10^6-200^2}=\mathbf{-200\pm j979.8}$ (underdamped).<br>
 (b) $v(0^+)=V_0=\mathbf{0}$. KCL (all currents downward): $i_C=-i_L-i_R=12.25$ mA $-0$ ⇒ $\dfrac{dv}{dt}=\dfrac{i_C}{C}=\mathbf{98\,000\,V/s}$.<br>
 (c) $v=e^{-200t}(B_1\cos979.8t+B_2\sin979.8t)$; $B_1=0$, $979.8B_2=98\,000$ ⇒ $v=\mathbf{100\,e^{-200t}\sin979.8t\ V}$.<br>
 (d) Decaying sine, period $2\pi/979.8=6.41$ ms: first peak ≈ 71 V at 1.4 ms, zero crossings at 3.2, 6.4, 9.6 ms.`},
{pid:"fpp:14", src:"2019 Q6 (10 marks)", q:R`Find $R_1$ and $R_2$ in Figure 5 so that $V_o=5(V_2-V_1)$.`,
 a:R`Stage 1 is non-inverting (feedback from the $R_1$/$R_2$ divider): $V_x=\left(1+\dfrac{R_1}{R_2}\right)V_1$.<br>
 Stage 2: $V_x$ through $R_1$ to the − input, $R_2$ feedback, $V_2$ on the + input:<br>
 $V_o=\left(1+\dfrac{R_2}{R_1}\right)V_2-\dfrac{R_2}{R_1}V_x=\left(1+\dfrac{R_2}{R_1}\right)V_2-\left(\dfrac{R_2}{R_1}+1\right)V_1=\left(1+\dfrac{R_2}{R_1}\right)(V_2-V_1)$.<br>
 Need $1+R_2/R_1=5$ ⇒ $\mathbf{R_2=4R_1}$, e.g. $R_1=10$ kΩ, $R_2=40$ kΩ.`},
{pid:"fpp:15", src:"2019 Q7 (8 marks)", q:R`Sketch the transfer function of the circuit in Figure 6 and explain why it is called a comparator.`,
 a:R`No feedback, so the full open-loop gain $A$ (~10⁵) acts on $V_{in}-V_{ref}$. A few µV of difference drives the output to a rail:<br>
 $V_{out}=+V_{CC}$ for $V_{in}>V_{ref}$, $-V_{CC}$ for $V_{in}<V_{ref}$.<br>
 Sketch: horizontal line at $-V_{CC}$, a (practically vertical) step at $V_{in}=V_{ref}$, horizontal line at $+V_{CC}$.<br>
 It "compares" two voltages and gives a two-level (digital-like) answer saying which is bigger.`},
{pid:"fpp:16", src:"2019 Q8 (12 marks)", q:R`The 2 kΩ is disconnected at $t=0$ and reconnected at $t=100$ ms. Find $i(t)$ (through the 8 kΩ, toward the middle node) for $t>0$.`,
 a:R`$t<0$ (C open): middle node $=2\cdot\dfrac{2}{2+6}=0.5$ V, so $v_C(0)=0.5$ V.<br>
 $0<t<100$ ms: C sees 8 k + 6 k = 14 kΩ to 2 V. $\tau_1=70$ ms, $v_C=2-1.5e^{-t/0.07}$.<br>
 $i=\dfrac{v_C-2}{14\text{k}}=\mathbf{-107.1\,e^{-t/70\text{ms}}\ \mu A}$. At 100 ms: $v_C=1.6405$ V.<br>
 $t>100$ ms: Thevenin seen by C: $V_{Th}=0.5$ V, $R_{Th}=8+(2\parallel6)=9.5$ kΩ, $\tau_2=47.5$ ms.<br>
 $i=\dfrac{v_C-0.5}{9.5\text{k}}=\mathbf{120.1\,e^{-(t-0.1)/47.5\text{ms}}\ \mu A}$ (it jumps from −25.7 µA to +120.1 µA at 100 ms).`},
{pid:"fpp:17", src:"2019 Q9 (10 marks)", q:R`Sketch $V_o$ vs $V_i$ for Figure 8 using the ideal diode model.`,
 a:R`Read the battery symbols: the left battery's long plate is at the bottom, so the left diode's anode sits at −2 V. The right battery puts the right diode's cathode at +3 V.<br>
 • Right diode (X → +3 V) is ON when $V_o>3$ V. Left diode (−2 V → 2 kΩ → X) is ON when $V_o<-2$ V.<br>
 • $-2\le V_i\le3$: both OFF, no current in the 4 kΩ, $\mathbf{V_o=V_i}$.<br>
 • $V_i>3$: right diode clamps, $\mathbf{V_o=3\,V}$.<br>
 • $V_i<-2$: divider between $V_i$ and −2 V: $\mathbf{V_o=-2+\tfrac13(V_i+2)}$ (slope 1/3).<br>
 Sketch: slope 1/3 below −2, slope 1 from (−2,−2) to (3,3), flat at 3 V above.`},
{pid:"fpp:18", src:"2019 Q10 (8 marks)", q:R`Use the small-signal model to find $v_o/v_s$ in Figure 9 (diode biased by current source $I$, coupling capacitors $C_1$, $C_2$).`,
 a:R`DC: the capacitors block, so all of $I$ flows through the diode: $r_d=V_T/I$.<br>
 AC: capacitors are shorts, the ideal current source is an open circuit, the diode is $r_d$. That leaves a divider $R_s$ – $r_d$:<br>
 $\dfrac{v_o}{v_s}=\mathbf{\dfrac{r_d}{R_s+r_d}=\dfrac{V_T}{IR_s+V_T}}$.`},
{pid:"fpp:19", src:"2020 A4 (5 marks)", q:R`The current into the + terminal of a 0.5 F capacitor is $i=2t-2$ A for $t>0$, with $v(0)=4$ V. When is the stored energy smallest?`,
 a:R`$v(t)=4+\dfrac1{0.5}\int_0^t(2\tau-2)d\tau=4+2(t^2-2t)=2(t-1)^2+2$ V.<br>
 $w=\tfrac12Cv^2$ is smallest when $|v|$ is smallest: at $\mathbf{t=1\,s}$ ($v=2$ V, $w=1$ J).`},
{pid:"fpp:20", src:"2020 B1 (20 marks)", q:R`In Fig. B1, $v(0^-)=12$ V across the 3 Ω. The switch (across the 10 A source) closes at $t=0$. Find (a) $i(0^-)$; (b) $v(0^+)$; (c) $di/dt(0^+)$; (d) the energy in the 3 H before switching.`,
 a:R`(a) Before: the 3 H is a short, so the 2 Ω is in parallel with the 3 Ω: $i(0^-)=12/2=\mathbf{6\,A}$ (check: 10 A into 3∥2 = 1.2 Ω gives 12 V ✓).<br>
 (b) The switch shorts the source, so the 15 Ω now runs from the node to ground. $i(0^+)=6$ A must return up through $15\parallel3=2.5\,\Omega$: $v(0^+)=-6(2.5)=\mathbf{-15\,V}$.<br>
 (c) KVL round the inductor branch: $3\dfrac{di}{dt}=v-2i=-15-12=-27$ ⇒ $\dfrac{di}{dt}=\mathbf{-9\,A/s}$.<br>
 (d) $w=\tfrac12(3)(6)^2=\mathbf{54\,J}$.`},
{pid:"fpp:21", src:"2020 B2 (20 marks)", q:R`Non-inverting summer (Fig. B2): (a) $R_f$ for $v_o=v_1+2v_2+4v_3$; (b) $i_1$ for $v_1=1$, $v_2=0.5$, $v_3=0.25$ V; (c) $i_o$; (d) the largest $v_3$ (±12 V rails) with $v_1$, $v_2$ unchanged.`,
 a:R`(a) KCL at the + input (1 kΩ to ground): $v_+=\dfrac{v_1/4+v_2/2+v_3/1}{1/4+1/2+1+1}=\dfrac{v_1+2v_2+4v_3}{11}$. Need gain $1+R_f/10\text{k}=11$ ⇒ $R_f=\mathbf{100\,k\Omega}$.<br>
 (b) $v_+=3/11=0.2727$ V; $i_1=\dfrac{1-0.2727}{4\text{k}}=\mathbf{181.8\,\mu A}$.<br>
 (c) $v_o=3$ V. $i_o=\dfrac{3}{5\text{k}}+\dfrac{3-0.2727}{100\text{k}}=0.6+0.0273=\mathbf{0.627\,mA}$.<br>
 (d) $v_o=1+1+4v_3\le12$ ⇒ $v_3\le\mathbf{2.5\,V}$.`},
{pid:"fpp:22", src:"2020 B3 (20 marks)", q:R`Source-free parallel RLC with $R=1$ kΩ, $C=1\,\mu$F. (a) $L$ for roots −200 and −800; (b) $L$ for critical damping; (c) derive the ODE for $i$; (d) $i(t)$ for $R=5\,\Omega$, $L=2$ H, $C=0.04$ F, $v(0)=0$, $i(0)=2$ A.`,
 a:R`$\alpha=\dfrac1{2RC}=500$ (check: $-(s_1+s_2)/2=500$ ✓).<br>
 (a) $\omega_0^2=s_1s_2=160\,000$ ⇒ $L=\dfrac1{\omega_0^2C}=\mathbf{6.25\,H}$.<br>
 (b) $\omega_0=\alpha=500$ ⇒ $L=\dfrac1{500^2\times10^{-6}}=\mathbf{4\,H}$.<br>
 (c) $v=L\dfrac{di}{dt}$. KCL: $\dfrac vR+i+C\dfrac{dv}{dt}=0$ ⇒ $\mathbf{\dfrac{d^2i}{dt^2}+\dfrac1{RC}\dfrac{di}{dt}+\dfrac{i}{LC}=0}$.<br>
 (d) $s^2+5s+12.5=0$ ⇒ $s=-2.5\pm j2.5$. $i=e^{-2.5t}(A\cos2.5t+B\sin2.5t)$; $i(0)=2$ ⇒ $A=2$; $di/dt(0)=v(0)/L=0$ ⇒ $-2.5A+2.5B=0$ ⇒ $B=2$.<br>
 $i(t)=\mathbf{2e^{-2.5t}(\cos2.5t+\sin2.5t)\ A}$.`},
// ───────── Supplementary Exercise Part 3: diodes (pid sp3:N) — Quiz 2 scope ─────────
{pid:"sp3:0", src:"Supp. Part 3 Q1", q:R`Find $v_L$ in Fig. 1 ($D$ ideal) for $v_s<0$ and $v_s>0$.`,
 a:R`• $v_s<0$: the diode's anode is pulled below its cathode, so it is reverse-biased (open) and $\mathbf{v_L=0}$.<br>
 • $v_s>0$: the diode is a short, so $R_L$ sits in parallel with $R_1$ and the source sees a divider:<br>
 $v_L=\mathbf{v_s\dfrac{R_L\parallel R_1}{R_S+R_L\parallel R_1}}$.`},
{pid:"sp3:1", src:"Supp. Part 3 Q2", q:R`Constant-voltage model, $V_{D,on}=0.7$ V, $E=5$ V. (a) $R$ for $I=5$ mA? (b) The diode needs at least 1 mA to conduct. With that $R$, what is the smallest $E$ that still gives 1 mA?`,
 a:R`(a) KVL: $E=IR+0.7$ ⇒ $R=\dfrac{5-0.7}{5\times10^{-3}}=\mathbf{860\,\Omega}$.<br>
 (b) $\dfrac{E_{min}-0.7}{860}=1\times10^{-3}$ ⇒ $E_{min}=0.86+0.7=\mathbf{1.56\,V}$.`},
{pid:"sp3:2", src:"Supp. Part 3 Q3", q:R`Which diodes in Fig. 3(a)–(e) are forward-biased and which are reverse-biased?`,
 a:R`Rule: forward-biased if the anode (triangle side) is at a higher potential than the cathode (bar side).<br>
 (a) anode at 0 V, cathode pulled up to +5 V through $R$ ⇒ <b>reverse</b>.<br>
 (b) cathode at +5 V, anode pulled up to +10 V ⇒ <b>forward</b>.<br>
 (c) anode at −10 V side, cathode at +5 V ⇒ <b>reverse</b>.<br>
 (d) cathode at −12 V, anode pulled to −5 V ⇒ <b>forward</b> (−5 > −12).<br>
 (e) anode at 0 V, cathode pulled to −10 V ⇒ <b>forward</b>.`},
{pid:"sp3:3", src:"Supp. Part 3 Q4", q:R`For Fig. 4(a)–(c), which diodes conduct? With 0.7 V across each conducting diode, find $v_{out}$.`,
 a:R`All diodes point from the common node (anode) to an input (cathode), and $R$ connects the node to a supply. The diode whose cathode is <i>lowest</i> turns on first and pins the node 0.7 V above that input; the rest are then reverse-biased.<br>
 (a) $R$ to +5 V; lowest inputs are −5 V ⇒ <b>D2, D4 on</b>, D1, D3 off. $v_{out}=-5+0.7=\mathbf{-4.3\,V}$.<br>
 (b) $R$ to +15 V; lowest input −10 V ⇒ <b>D3 on</b>, D1, D2 off. $v_{out}=-10+0.7=\mathbf{-9.3\,V}$.<br>
 (c) $R$ to <i>−10 V</i>: the node is pulled down below both inputs (−5 V and +5 V), so both diodes are reverse-biased, no current flows in $R$ and $v_{out}=\mathbf{-10\,V}$. (The suggested-answer sheet skips this part.)`},
{pid:"sp3:4", src:"Supp. Part 3 Q5", q:R`Sketch $v_o(t)$ for Fig. 5 with an ideal diode and $v_s(t)=10\sin(2000\pi t)$.`,
 a:R`The diode's anode sits on the +4 V battery and its cathode on the output node.<br>
 • Diode off: the two 10 Ω form a divider, $v_o=v_s/2$.<br>
 • Diode on when the output would fall below 4 V: it clamps $v_o=4$ V.<br>
 So $v_o=\max(v_s/2,\,4)$: $\mathbf{v_o=4\,V}$ for $v_s<8$ V, and $\mathbf{v_o=v_s/2}$ for $v_s\ge8$ V. Peaks reach 5 V; the period is 1 ms (f = 1 kHz).<br>
 <img src="img/sp3_5a.png" alt="Q5 output waveform" style="max-width:260px;background:#fff;border-radius:8px;padding:4px;margin-top:6px">`},
{pid:"sp3:5", src:"Supp. Part 3 Q6", q:R`Repeat Q5 with the constant-voltage model ($V_{D,on}=0.7$ V).`,
 a:R`Now the diode turns on when $v_o$ drops to $4-0.7=3.3$ V.<br>
 $\mathbf{v_o=3.3\,V}$ for $v_s<6.6$ V, and $\mathbf{v_o=v_s/2}$ for $v_s\ge6.6$ V (peak still 5 V).<br>
 <img src="img/sp3_6a.png" alt="Q6 output waveform" style="max-width:280px;background:#fff;border-radius:8px;padding:4px;margin-top:6px">`},
// ───────── Sadiku Ch 5: op amps (pid c5:N) — Quiz 2 scope ─────────
{pid:"c5:0", src:"Sadiku 5.13", q:R`Find $v_o$ and $i_o$ in the circuit of Fig. 5.52.`,
 a:R`+ input from the 10 k/90 k divider: $v_+=1\cdot\dfrac{90}{100}=0.9$ V.<br>
 Non-inverting with $R_f=100$ k, $R_1=50$ k: $v_o=0.9(1+100/50)=\mathbf{2.7\,V}$.<br>
 $i_o$ feeds the 10 k load and the 150 k feedback path: $i_o=\dfrac{2.7}{10\text{k}}+\dfrac{2.7}{150\text{k}}=270+18=\mathbf{288\,\mu A}$.`},
{pid:"c5:1", src:"Sadiku 5.17", q:R`Find the gain $v_o/v_i$ of Fig. 5.56 with the switch in position 1, 2 and 3.`,
 a:R`Inverting amplifier with $R_i=5$ k; the switch picks $R_f$.<br>
 (1) $-12/5=\mathbf{-2.4}$ &nbsp; (2) $-80/5=\mathbf{-16}$ &nbsp; (3) $-2000/5=\mathbf{-400}$.<br>
 The 10 kΩ load doesn't change the gain (ideal output).`},
{pid:"c5:2", src:"Sadiku 5.19", q:R`Determine $i_o$ in the circuit of Fig. 5.58.`,
 a:R`Thevenin of 750 mV, 2 k, 4 k: $V_{Th}=0.5$ V, $R_{Th}=1.333$ k. Add the 4 k in series: input resistance 5.333 k.<br>
 Inverting: $v_o=-\dfrac{10}{5.333}(0.5)=-0.9375$ V.<br>
 KCL at the output: $i_o=\dfrac{v_o}{2\text{k}}+\dfrac{v_o-0}{10\text{k}}=-0.469-0.094=\mathbf{-562.5\,\mu A}$ (so 562.5 µA flows <i>into</i> the op-amp output).`},
{pid:"c5:3", src:"Sadiku 5.21", q:R`Calculate $v_o$ in the op-amp circuit of Fig. 5.60.`,
 a:R`$v_-=v_+=1$ V. KCL at the − node: $\dfrac{3-1}{4\text{k}}=\dfrac{1-v_o}{10\text{k}}$ ⇒ $5=1-v_o$ ⇒ $\mathbf{v_o=-4\,V}$.<br>
 (Superposition check: $-\tfrac{10}{4}(3)+(1+\tfrac{10}{4})(1)=-7.5+3.5=-4$.)`},
{pid:"c5:4", src:"Sadiku 5.25", q:R`Calculate $v_o$ in Fig. 5.63.`,
 a:R`A voltage follower gives 3.7 V at its output with no loading, then the 12 k/20 k divider:<br>
 $v_o=3.7\cdot\dfrac{20}{32}=\mathbf{2.3125\,V}$.`},
{pid:"c5:5", src:"Sadiku 5.27", q:R`Find $v_o$ in Fig. 5.65.`,
 a:R`$v_1=7.5\cdot\dfrac{24}{40}=4.5$ V (no current into the + input). Follower: $v_2=4.5$ V.<br>
 $v_o=4.5\cdot\dfrac{12}{8+12}=\mathbf{2.7\,V}$.`},
{pid:"c5:6", src:"Sadiku 5.31", q:R`Find $i_x$ in Fig. 5.69.`,
 a:R`Call the top of the 3 k node A and the node between the 6 k's node B (it feeds the + input). The op amp is a follower, so $v_o=v_B$.<br>
 No current into + ⇒ the 6 k from A to B and the 6 k from B to ground form a divider: $v_B=v_A/2$.<br>
 KCL at A: $4\text{ mA}=\dfrac{v_A}{3}+\dfrac{v_A-v_B}{6}+\dfrac{v_A-v_o}{12}=v_A\left(\dfrac13+\dfrac1{12}+\dfrac1{24}\right)=\dfrac{11v_A}{24}$ ⇒ $v_A=8.727$ V.<br>
 $i_x=\dfrac{v_B}{6\text{k}}=\dfrac{4.364}{6\text{k}}=\mathbf{727.2\,\mu A}$.`},
{pid:"c5:7", src:"Sadiku 5.33", q:R`In Fig. 5.71 find $i_x$ and the power absorbed by the 3 kΩ resistor.`,
 a:R`The + input hops over the wire and connects to the source/4 k node; no current flows into it, so all 1 mA goes through the 4 k: $v_+=4$ V.<br>
 The − input sits on the 1 k/2 k divider from the output: non-inverting gain $1+1/2=1.5$ ⇒ $v_o=6$ V.<br>
 $i_x=6/3\text{k}=\mathbf{2\,mA}$; $p=\dfrac{6^2}{3\text{k}}=\mathbf{12\,mW}$.`},
{pid:"c5:8", src:"Sadiku 5.37", q:R`Determine the output of the summing amplifier in Fig. 5.74.`,
 a:R`Read the source polarities: the inputs at the resistors are $+2$ V, $-2$ V and $-4.5$ V (the 4.5 V source has its + on the ground side).<br>
 $v_o=-\left(\dfrac{30}{10}(2)+\dfrac{30}{20}(-2)+\dfrac{30}{30}(-4.5)\right)=-(6-3-4.5)=\mathbf{1.5\,V}$.`},
{pid:"c5:9", src:"Sadiku 5.39", q:R`For Fig. 5.76, find $v_2$ so that $v_o=-16.5$ V.`,
 a:R`Summer with $R_f=50$ k: $v_o=-\left(5(2)+2.5v_2+1(-1)\right)=-(9+2.5v_2)$.<br>
 $-(9+2.5v_2)=-16.5$ ⇒ $\mathbf{v_2=3\,V}$.`},
{pid:"c5:10", src:"Sadiku 5.47", q:R`The circuit in Fig. 5.79 is a difference amplifier. Find $v_o$ for $v_1=1$ V, $v_2=2$ V.`,
 a:R`$v_+=v_2\dfrac{20}{22}=1.818$ V. KCL at the − node with $v_-=v_+$:<br>
 $v_o=\left(1+\dfrac{30}{2}\right)v_+-\dfrac{30}{2}v_1=16(1.818)-15=\mathbf{14.09\,V}$.<br>
 (Not a balanced difference amp, since $2/30\ne2/20$, so you can't just use $\tfrac{R_2}{R_1}(v_2-v_1)$.)`},
{pid:"c5:11", src:"Sadiku 5.55", q:R`A three-stage amplifier needs an overall gain of 42 dB. Stages 1 and 2 have equal gain; stage 3 has one-fourth of each of those. Find each gain.`,
 a:R`$A=10^{42/20}=125.9$. With $A_1=A_2=a$, $A_3=a/4$: $a^3/4=125.9$ ⇒ $a^3=503.6$ ⇒ $a=\mathbf{7.956}$.<br>
 Gains: $\mathbf{7.956,\ 7.956,\ 1.989}$.`},
{pid:"c5:12", src:"Sadiku 5.61", q:R`Determine $v_o$ in Fig. 5.88.`,
 a:R`Stage 1, inverting: $v_a=-\dfrac{20}{10}(0.4)=-0.8$ V.<br>
 Stage 2 is an inverting summer ($R_f=40$ k) fed by −0.2 V through 10 k and $v_a$ through 20 k:<br>
 $v_o=-\left(\dfrac{40}{10}(-0.2)+\dfrac{40}{20}(-0.8)\right)=-(-0.8-1.6)=\mathbf{2.4\,V}$.`},
{pid:"c5:13", src:"Sadiku 5.65", q:R`Find $v_o$ in Fig. 5.92.`,
 a:R`Stage 1 is a follower (the 50 k carries no current): 6 mV.<br>
 Stage 2, inverting: $-\dfrac{30}{10}(6)=-18$ mV.<br>
 Stage 3, non-inverting (the 20 k into the + input carries no current; $R_f=8$ k, $R_g=40$ k): $v_o=-18\left(1+\dfrac{8}{40}\right)=\mathbf{-21.6\,mV}$.`},
// ───────── Sadiku Ch 6: capacitors & inductors (pid c6:N) — final ─────────
{pid:"c6:0", src:"Sadiku 6.7", q:R`At $t=0$ a 25 mF capacitor has 10 V. Find its voltage for $t>0$ when a current of $5t$ mA flows through it.`,
 a:R`$v(t)=v(0)+\dfrac1C\int_0^t i\,d\tau=10+\dfrac{1}{0.025}\int_0^t0.005\tau\,d\tau=10+40(0.0025t^2)=\mathbf{0.1t^2+10\ V}$.`},
{pid:"c6:1", src:"Sadiku 6.9", q:R`The current through a 0.5 F capacitor is $6(1-e^{-t})$ A, $v(0)=0$. Find the voltage and power at $t=2$ s.`,
 a:R`$v=\dfrac1{0.5}\int_0^t6(1-e^{-\tau})d\tau=12(t+e^{-t}-1)$. At 2 s: $v=12(1+0.1353)=\mathbf{13.62\,V}$.<br>
 $i(2)=6(1-e^{-2})=5.188$ A ⇒ $p=vi=\mathbf{70.7\,W}$.`},
{pid:"c6:2", src:"Sadiku 6.15", q:R`25 µF and 75 µF capacitors are connected to 100 V. Find the energy in each when they are (a) in parallel, (b) in series.`,
 a:R`(a) Both see 100 V: $w_{25}=\tfrac12(25\mu)(100^2)=\mathbf{125\,mJ}$, $w_{75}=\mathbf{375\,mJ}$.<br>
 (b) Series: same charge, so the voltage splits inversely to C: $v_{25}=100\cdot\tfrac{75}{100}=75$ V, $v_{75}=25$ V.<br>
 $w_{25}=\tfrac12(25\mu)(75^2)=\mathbf{70.31\,mJ}$, $w_{75}=\tfrac12(75\mu)(25^2)=\mathbf{23.44\,mJ}$.`},
{pid:"c6:3", src:"Sadiku 6.17", q:R`Determine the equivalent capacitance of each circuit in Fig. 6.51.`,
 a:R`(a) 12 F in series with the bottom-right 4 F: 3 F. In parallel with 6 F and 3 F: $3+6+3=12$ F. In series with the input 4 F: $\mathbf{3\,F}$.<br>
 (b) 4 F ∥ 2 F = 6 F, in series with 6 F: 3 F. In parallel with the 5 F across the terminals: $\mathbf{8\,F}$.<br>
 (c) 3 F series 6 F = 2 F, ∥ 4 F = 6 F. Then 2 F, 6 F, 3 F in series: $\tfrac1{1/2+1/6+1/3}=\mathbf{1\,F}$.`},
{pid:"c6:4", src:"Sadiku 6.19", q:R`Find the equivalent capacitance between a and b in Fig. 6.53 (all in µF).`,
 a:R`Nodes: P (after the first 12), Q (bottom-left = b), R (the top junction where the diagonals meet), U (bottom middle). The top-right wire is part of R and the bottom-right corner is joined to U by the bottom wire. Remember: capacitors in parallel <i>add</i>.<br>
 • R–U: the 30, the 20 diagonal and the 10 are all between R and U ⇒ $30+20+10=60$.<br>
 • Q–U is the 60 on the bottom; in series with the 60 above ⇒ 30 from Q to R. Add the 50 diagonal (Q–R) ⇒ 80.<br>
 • P–R: $80+40=120$; in series with that 80 ⇒ $\tfrac{120\cdot80}{200}=48$ from P to Q. Add the 12 (P–Q) ⇒ 60.<br>
 • In series with the input 12: $\dfrac{12\cdot60}{72}=\mathbf{10\,\mu F}$.`},
{pid:"c6:5", src:"Sadiku 6.21", q:R`Determine the equivalent capacitance at terminals a-b in Fig. 6.55.`,
 a:R`Work from the right: 4 series 12 = 3; ∥ 3 = 6; series 6 = 3; ∥ 2 = 5; series 5 = $\mathbf{2.5\,\mu F}$.`},
{pid:"c6:6", src:"Sadiku 6.37", q:R`The current through a 12 mH inductor is $4\sin100t$ A. Find the voltage for $0<t<\pi/200$ s and the energy stored at $t=\pi/200$ s.`,
 a:R`$v=L\dfrac{di}{dt}=0.012(400\cos100t)=\mathbf{4.8\cos100t\ V}$.<br>
 At $t=\pi/200$: $i=4\sin(\pi/2)=4$ A ⇒ $w=\tfrac12(0.012)(16)=\mathbf{96\,mJ}$.`},
{pid:"c6:7", src:"Sadiku 6.39", q:R`The voltage across a 200 mH inductor is $v=3t^2+2t+4$ V for $t>0$. Find $i(t)$ if $i(0)=1$ A.`,
 a:R`$i=1+\dfrac1{0.2}\int_0^t(3\tau^2+2\tau+4)d\tau=1+5(t^3+t^2+4t)=\mathbf{5t^3+5t^2+20t+1\ A}$.`},
{pid:"c6:8", src:"Sadiku 6.41", q:R`The voltage across a 2 H inductor is $20(1-e^{-2t})$ V. With $i(0)=0.3$ A, find the current and the stored energy at $t=1$ s.`,
 a:R`$i=0.3+\dfrac12\int_0^t20(1-e^{-2\tau})d\tau=0.3+10t+5e^{-2t}-5$.<br>
 $i(1)=0.3+10+0.677-5=\mathbf{5.977\,A}$; $w=\tfrac12(2)(5.977)^2=\mathbf{35.72\,J}$.`},
{pid:"c6:9", src:"Sadiku 6.49", q:R`Find the equivalent inductance of Fig. 6.72 (all inductors 10 mH).`,
 a:R`The top wire joins the top-left corner to the middle vertical line, so the horizontal inductor runs from the middle-left node back to the top node: it is in parallel with the upper-left inductor ⇒ 5 mH.<br>
 5 + lower-left 10 = 15 mH (top to bottom). In parallel with the middle-column lower 10 mH and the right 10 mH:<br>
 $15\parallel10\parallel10=15\parallel5=\mathbf{3.75\,mH}$.`},
{pid:"c6:10", src:"Sadiku 6.51", q:R`Determine $L_{eq}$ at terminals a-b of Fig. 6.73.`,
 a:R`60 ∥ 20 ∥ 30 = 10 mH, in series with 25 mH = 35 mH. The top 10 mH runs from a to b, so it is in parallel with that 35:<br>
 $L_{eq}=\dfrac{10\cdot35}{45}=\mathbf{7.778\,mH}$.`},
{pid:"c6:11", src:"Sadiku 6.53", q:R`Find $L_{eq}$ at the terminals of Fig. 6.75.`,
 a:R`Let P be after the 6 mH, T after the 10 mH, R the right vertex of the triangle.<br>
 • P–R: 5 ∥ (8 + 12) = 4 mH. &nbsp; • R–T: 6 ∥ (4 + 8) = 4 mH.<br>
 • P–T: 8 ∥ (4 + 4) = 4 mH.<br>
 $L_{eq}=6+4+10=\mathbf{20\,mH}$.`},
{pid:"c6:12", src:"Sadiku 6.61", q:R`In Fig. 6.83, $i_s=3e^{-t}$ mA. Find (a) $L_{eq}$, $i_1(t)$, $i_2(t)$; (b) $v_o(t)$; (c) the energy in the 20 mH at $t=1$ s.`,
 a:R`(a) $L_{eq}=20\parallel(4+6)=\mathbf{6.667\,mH}$. Parallel inductors split current inversely to L (zero initial currents): $i_1=\tfrac{10}{30}i_s=\mathbf{e^{-t}\,mA}$, $i_2=\mathbf{2e^{-t}\,mA}$.<br>
 (b) $v_o=L_{eq}\dfrac{di_s}{dt}=6.667\text{m}\times(-3e^{-t}\text{ mA/s})=\mathbf{-20e^{-t}\,\mu V}$.<br>
 (c) $w=\tfrac12(0.02)(e^{-1}\times10^{-3})^2=\mathbf{1.353\,nJ}$.`},
{pid:"c6:13", src:"Sadiku 6.67", q:R`An op-amp integrator has $R=50$ kΩ, $C=0.04\,\mu$F. Find $v_o$ for $v_i=10\sin50t$ mV.`,
 a:R`$RC=2$ ms. $v_o=-\dfrac1{RC}\int_0^t10\sin50\tau\,d\tau=-500\cdot\dfrac{10}{50}(1-\cos50t)=\mathbf{-100(1-\cos50t)\ mV}$.<br>
 The textbook key quotes only the AC part, $100\cos50t$ mV.`},
{pid:"c6:14", src:"Sadiku 6.71", q:R`Show how a single op amp can give $v_o=-\int_0^t(v_1+4v_2+10v_3)dt$. With $C=2\,\mu$F, find the other component values.`,
 a:R`Use a summing integrator: three input resistors into the − node, $C$ in feedback, + grounded. Each weight is $1/(R_kC)$:<br>
 $R_1=\dfrac{1}{1\cdot2\mu}=\mathbf{500\,k\Omega}$, $R_2=\dfrac1{4\cdot2\mu}=\mathbf{125\,k\Omega}$, $R_3=\dfrac1{10\cdot2\mu}=\mathbf{50\,k\Omega}$.`},
{pid:"c6:15", src:"Sadiku 6.75", q:R`An op-amp differentiator has $R=250$ kΩ, $C=10\,\mu$F. The input is the ramp $12t$ mV. Find $v_o$.`,
 a:R`$RC=2.5$ s. $v_o=-RC\dfrac{dv_i}{dt}=-2.5(12\text{ mV/s})=\mathbf{-30\,mV}$ (constant).`},
// ───────── Sadiku Ch 7: first-order circuits (pid c7:N) — final ─────────
{pid:"c7:0", src:"Sadiku 7.1", q:R`In an RC circuit, $v=56e^{-200t}$ V and $i=8e^{-200t}$ mA for $t>0$. (a) Find $R$ and $C$. (b) τ? (c) Time for $v$ to halve.`,
 a:R`(a) $R=v/i=56/8\text{m}=\mathbf{7\,k\Omega}$; $\tau=1/200=5$ ms ⇒ $C=\tau/R=\mathbf{0.714\,\mu F}$.<br>
 (b) $\tau=\mathbf{5\,ms}$. (c) $e^{-t/\tau}=0.5$ ⇒ $t=\tau\ln2=\mathbf{3.466\,ms}$.`},
{pid:"c7:1", src:"Sadiku 7.3", q:R`Determine the time constant for the circuit in Fig. 7.83.`,
 a:R`Resistance seen by the capacitor: $10+40\parallel(20+30)=10+22.22=32.22$ kΩ.<br>
 $\tau=32.22\text{k}\times100\text{p}=\mathbf{3.222\,\mu s}$.`},
{pid:"c7:2", src:"Sadiku 7.9", q:R`The switch in Fig. 7.89 opens at $t=0$. Find $v_o$ for $t>0$.`,
 a:R`Before (C open): $v_o(0)=6\cdot\dfrac{4}{6}=4$ V. After: the 3 mF discharges into the 4 kΩ alone, $\tau=4\text{k}\times3\text{m}=12$ s.<br>
 $v_o=\mathbf{4e^{-t/12}\ V}$.`},
{pid:"c7:3", src:"Sadiku 7.11", q:R`For the circuit in Fig. 7.91, find $i_o$ for $t>0$.`,
 a:R`Before (switch closed, L short): $4\parallel8=2.667\,\Omega$, total 6.667 Ω, source current 3.6 A, node voltage 9.6 V ⇒ $i_o(0)=9.6/8=1.2$ A.<br>
 After the switch opens, the 4 H sees $4+8=12\,\Omega$: $\tau=4/12=1/3$ s.<br>
 $i_o=\mathbf{1.2e^{-3t}\ A}$.`},
{pid:"c7:4", src:"Sadiku 7.13", q:R`For an RL circuit, $v=80e^{-10^3t}$ V and $i=5e^{-10^3t}$ mA. (a) Find $R$, $L$, τ. (b) Energy dissipated in R for $0<t<0.5$ ms.`,
 a:R`(a) $R=80/5\text{m}=\mathbf{16\,k\Omega}$, $\tau=\mathbf{1\,ms}$, $L=R\tau=\mathbf{16\,H}$.<br>
 (b) $w=\int_0^{0.5\text{m}}vi\,dt=0.4\int_0^{0.5\text{m}}e^{-2000t}dt=0.4\cdot\dfrac{1-e^{-1}}{2000}=\mathbf{126.4\,\mu J}$.`},
{pid:"c7:5", src:"Sadiku 7.17", q:R`In Fig. 7.97, find $v_o(t)$ if $i(0)=6$ A and $v(t)=0$.`,
 a:R`With the source at 0 V the inductor sees $1+3=4\,\Omega$: $\tau=\tfrac{1/4}{4}=\tfrac1{16}$ s, so $i=6e^{-16t}$ A.<br>
 $v_o$ is across the 3 Ω + L branch: $v_o=3i+\tfrac14\dfrac{di}{dt}=18e^{-16t}-24e^{-16t}=\mathbf{-6e^{-16t}\,V}$ (equivalently $-1\Omega\times i$).`},
{pid:"c7:6", src:"Sadiku 7.19", q:R`In Fig. 7.99, find $i(t)$ for $t>0$ if $i(0)=6$ A.`,
 a:R`Find the resistance the 6 H sees. With $i$ flowing left→right through L:<br>
 • right node: $i=0.5i+v_R/40$ ⇒ $v_R=20i$. &nbsp; • left node: $i$ is drawn up through the 10 Ω ⇒ $v_L=-10i$.<br>
 $6\dfrac{di}{dt}=v_L-v_R=-30i$ ⇒ $\tau=0.2$ s ⇒ $i=\mathbf{6e^{-5t}\ A}$ (equivalent resistance 30 Ω).`},
{pid:"c7:7", src:"Sadiku 7.37", q:R`A circuit obeys $4\dfrac{dv}{dt}+v=10$. (a) τ? (b) $v(\infty)$? (c) $v(t)$ if $v(0)=2$.`,
 a:R`(a) $\tau=\mathbf{4\,s}$. (b) $v(\infty)=\mathbf{10\,V}$. (c) $v=10+(2-10)e^{-t/4}=\mathbf{10-8e^{-t/4}\ V}$.`},
{pid:"c7:8", src:"Sadiku 7.39(a)", q:R`Find the capacitor voltage for $t<0$ and $t>0$ in Fig. 7.106(a). (The switch opens at $t=0$.)`,
 a:R`$t<0$: C open, divider $20\cdot\dfrac{1}{4+1}=\mathbf{4\,V}$.<br>
 $t>0$: the 1 Ω is disconnected; C charges through 4 Ω toward 20 V, $\tau=4\times2=8$ s.<br>
 $v=\mathbf{20-16e^{-t/8}\ V}$.`},
{pid:"c7:9", src:"Sadiku 7.43", q:R`Find $i(t)$ for $t<0$ and $t>0$ in Fig. 7.110 (the switch opens at $t=0$).`,
 a:R`$t<0$ (C open): KCL at the capacitor node A: $\dfrac{80-v_A}{40}+0.5i=i$, and $v_A=80i$ (30 Ω + 50 Ω carry $i$). ⇒ $2-2i=0.5i$ ⇒ $i=\mathbf{0.8\,A}$, $v_A=64$ V.<br>
 $t>0$: KCL at A: $3\dfrac{dv}{dt}+i-0.5i=0$ with $i=v/80$ ⇒ $\dfrac{dv}{dt}=-\dfrac{v}{480}$, $\tau=480$ s.<br>
 $i=\mathbf{0.8e^{-t/480}\ A}$.`},
{pid:"c7:10", src:"Sadiku 7.45", q:R`Find $v_o$ in Fig. 7.112 for $v_s=30u(t)$ V and $v_o(0)=5$ V.`,
 a:R`Thevenin seen by the 3 µF: $V_{Th}=30\cdot\dfrac{40}{60}=20$ V, $R_{Th}=10+20\parallel40=23.33$ kΩ, $\tau=70$ ms.<br>
 $v_o=20+(5-20)e^{-t/0.07}=\mathbf{20-15e^{-14.29t}\ V}$.`},
{pid:"c7:11", src:"Sadiku 7.53", q:R`Find the inductor current $i$ for $t<0$ and $t>0$ in each circuit of Fig. 7.119.`,
 a:R`(a) $t<0$: $i=25/(3+2)=\mathbf{5\,A}$. At $t=0$ the switch shorts the middle node to ground, so the 4 H decays through 2 Ω: $\tau=2$ s, $i=\mathbf{5e^{-t/2}\ A}$.<br>
 (b) $t<0$: the inductor shorts the 4 Ω and 2 Ω, so $i=\mathbf{6\,A}$. At $t=0$ the switch disconnects the source and 4 Ω, leaving 3 H with 2 Ω: $\tau=1.5$ s, $i=\mathbf{6e^{-2t/3}\ A}$.`},
{pid:"c7:12", src:"Sadiku 7.59", q:R`Find the step response $v_o(t)$ to $v_s=18u(t)$ in Fig. 7.124.`,
 a:R`Thevenin seen by the 4 Ω + 1.5 H branch: $V_{Th}=18\cdot\tfrac36=6$ V, $R_{Th}=6\parallel3=2\,\Omega$ (+4 Ω = 6 Ω).<br>
 $i=1-e^{-4t}$ A ($\tau=1.5/6$). $v_o=1.5\dfrac{di}{dt}=\mathbf{6e^{-4t}u(t)\ V}$.`},
{pid:"c7:13", src:"Sadiku 7.61", q:R`In Fig. 7.126, $i_s$ steps from 5 A to 10 A at $t=0$. Find $v$ and $i$.`,
 a:R`$i(0)=5$ A (L shorts the 4 Ω before). $i(\infty)=10$ A, $\tau=0.5/4=1/8$ s.<br>
 $i=\mathbf{10-5e^{-8t}\ A}$; $v=0.5\dfrac{di}{dt}=\mathbf{20e^{-8t}\ V}$ ($t>0$).`},
{pid:"c7:14", src:"Sadiku 7.63", q:R`Obtain $v(t)$ and $i(t)$ in Fig. 7.128.`,
 a:R`$t<0$: L short ⇒ $i=10/5=2$ A, $v=0$.<br>
 $t>0$: source is 0 V, L sees $5\parallel20=4\,\Omega$, $\tau=0.125$ s.<br>
 $i=\mathbf{2e^{-8t}\ A}$, $v=0.5\dfrac{di}{dt}=\mathbf{-8e^{-8t}\ V}$.`},
{pid:"c7:15", src:"Sadiku 7.71", q:R`For the op-amp circuit in Fig. 7.136, $v_0=0$ and $v_s=3$ V. Find $v(t)$ for $t>0$.`,
 a:R`The op amp is non-inverting with gain $1+10/10=2$: its output is 6 V. That drives the 20 kΩ/10 µF RC with $\tau=0.2$ s.<br>
 $v=\mathbf{6(1-e^{-5t})\ V}$.`},
// ───────── Sadiku Ch 8: second-order circuits (pid c8:N) — final ─────────
{pid:"c8:0", src:"Sadiku 8.1", q:R`For Fig. 8.62 (switch opens at $t=0$) find (a) $i(0^+)$, $v(0^+)$; (b) $di/dt$, $dv/dt$ at $0^+$; (c) $i(\infty)$, $v(\infty)$.`,
 a:R`(a) Before: L short, C open ⇒ $i=12/6=\mathbf{2\,A}$, $v=\mathbf{12\,V}$ (no current in the 4 Ω).<br>
 (b) After, one loop: 6 Ω + 2 H down, 0.4 F + 4 Ω back up, so the capacitor current is $-i$.<br>
 $\dfrac{dv}{dt}=\dfrac{-2}{0.4}=\mathbf{-5\,V/s}$. Top-node voltage from the right branch: $12+4(-2)=4$ V, so $2\dfrac{di}{dt}=4-6(2)$ ⇒ $\dfrac{di}{dt}=\mathbf{-4\,A/s}$.<br>
 (c) No source: $\mathbf{0\,A,\ 0\,V}$.`},
{pid:"c8:1", src:"Sadiku 8.5", q:R`For Fig. 8.66 find (a) $i(0^+)$, $v(0^+)$; (b) $di/dt$, $dv/dt$ at $0^+$; (c) $i(\infty)$, $v(\infty)$.`,
 a:R`(a) Before $t=0$ the source is off: everything is zero, $\mathbf{i=0,\ v=0}$.<br>
 (b) At $0^+$: $v_C=0$ and $i_L=0$, so the full 4 A charges the ¼ F: $dv_C/dt=16$ V/s. $i=v_C/4$ ⇒ $\dfrac{di}{dt}=\mathbf{4\,A/s}$. $v=6i_L$ and $v_L=v_C-6i_L=0$ ⇒ $\dfrac{dv}{dt}=\mathbf{0}$.<br>
 (c) L short, C open: 4 A splits between 4 Ω and 6 Ω: $i=\mathbf{2.4\,A}$, $v=6(1.6)=\mathbf{9.6\,V}$.`},
{pid:"c8:2", src:"Sadiku 8.9", q:R`$\dfrac{d^2i}{dt^2}+10\dfrac{di}{dt}+25i=0$, $i(0)=10$ A, $i'(0)=0$. Find $i(t)$.`,
 a:R`$s^2+10s+25=0$ ⇒ $s=-5$ (double, critically damped). $i=(A+Bt)e^{-5t}$.<br>
 $A=10$; $i'(0)=-5A+B=0$ ⇒ $B=50$. $i=\mathbf{(10+50t)e^{-5t}\ A}$.`},
{pid:"c8:3", src:"Sadiku 8.11", q:R`$\dfrac{d^2v}{dt^2}+2\dfrac{dv}{dt}+v=0$, $v(0)=10$ V, $v'(0)=0$. Find $v(t)$.`,
 a:R`Double root $s=-1$: $v=(A+Bt)e^{-t}$, $A=10$, $-A+B=0$ ⇒ $B=10$. $v=\mathbf{(10+10t)e^{-t}\ V}$.`},
{pid:"c8:4", src:"Sadiku 8.13", q:R`For Fig. 8.68, find $R$ for a critically damped response.`,
 a:R`Series RLC with $R_{eq}=60\parallel R$, $L=4$ H, $C=0.01$ F. $\omega_0=1/\sqrt{0.04}=5$.<br>
 Critical: $\alpha=\dfrac{R_{eq}}{2L}=5$ ⇒ $R_{eq}=40$ ⇒ $\dfrac{60R}{60+R}=40$ ⇒ $R=\mathbf{120\,\Omega}$.`},
{pid:"c8:5", src:"Sadiku 8.15", q:R`A series RLC has $v_C=30-10e^{-20t}+30e^{-10t}$ V and $i_L=40e^{-20t}-60e^{-10t}$ mA. Find $R$, $L$, $C$.`,
 a:R`$i=C\,dv_C/dt=C(200e^{-20t}-300e^{-10t})$. Match $40$ mA: $C=0.04/200=\mathbf{200\,\mu F}$.<br>
 Roots −20, −10: $\omega_0^2=s_1s_2=200=\dfrac1{LC}$ ⇒ $L=\mathbf{25\,H}$. $2\alpha=30=R/L$ ⇒ $R=\mathbf{750\,\Omega}$.`},
{pid:"c8:6", src:"Sadiku 8.23", q:R`For Fig. 8.76, what $C$ makes the response underdamped with $\alpha=1$?`,
 a:R`Parallel RLC: $C$ and the 10 mF add, $C_{tot}=C+0.01$. $\alpha=\dfrac{1}{2RC_{tot}}=1$ with $R=10$ ⇒ $C_{tot}=0.05$ F ⇒ $C=\mathbf{40\,mF}$.<br>
 Check: $\omega_0=1/\sqrt{0.02\times0.05}=31.6>\alpha$, so it is underdamped.`},
{pid:"c8:7", src:"Sadiku 8.27", q:R`$\dfrac{d^2v}{dt^2}+4\dfrac{dv}{dt}+8v=24$, $v(0)=0=v'(0)$. Find $v(t)$.`,
 a:R`Final value $24/8=3$. Roots $s=-2\pm j2$. $v=3+e^{-2t}(A\cos2t+B\sin2t)$.<br>
 $v(0)=0$ ⇒ $A=-3$; $v'(0)=-2A+2B=0$ ⇒ $B=-3$.<br>
 $v=\mathbf{3-3e^{-2t}(\cos2t+\sin2t)\ V}$.`},
{pid:"c8:8", src:"Sadiku 8.31", q:R`For Fig. 8.79, find $v_L(0^+)$ and $v_C(0^+)$.`,
 a:R`$t<0$ ($2u(t)=0$): L short, C open. The 50 V drives 1 A through 10 Ω and 40 Ω into the inductor: $i_L=1$ A, $v_C=40$ V.<br>
 $t=0^+$: $v_C=\mathbf{40\,V}$, $i_L=1$ A. KCL at the inductor node with the 2 A source on: $2+\dfrac{40-v_L}{40}=1$ ⇒ $v_L=\mathbf{80\,V}$.`},
{pid:"c8:9", src:"Sadiku 8.43", q:R`The switch in Fig. 8.91 opens at $t=0$ after steady state. Choose $R$ and $C$ so that $\alpha=8$ Np/s and $\omega_d=30$ rad/s.`,
 a:R`After opening, R, C and the 0.5 H form a series loop.<br>
 $\alpha=R/2L=8$ ⇒ $R=\mathbf{8\,\Omega}$. $\omega_0^2=\alpha^2+\omega_d^2=964=\dfrac1{LC}$ ⇒ $C=\dfrac{1}{0.5\times964}=\mathbf{2.075\,mF}$.`},
{pid:"c8:10", src:"Sadiku 8.45", q:R`In Fig. 8.92 find $v(t)$ and $i(t)$ for $t>0$, with $v(0)=0$, $i(0)=1$ A.`,
 a:R`Parallel RLC driven by 4 A: $\alpha=\dfrac1{2RC}=0.5$, $\omega_0=1/\sqrt{LC}=\sqrt2$, $\omega_d=1.3229$. Final $i=4$ A.<br>
 $i=4+e^{-t/2}(A\cos1.3229t+B\sin1.3229t)$; $A=-3$; $i'(0)=v(0)/L=0$ ⇒ $B=-1.134$.<br>
 $i=\mathbf{4-e^{-t/2}(3\cos1.3229t+1.134\sin1.3229t)\ A}$, $v=L\dfrac{di}{dt}=\mathbf{4.536e^{-t/2}\sin1.3229t\ V}$.`},
{pid:"c8:11", src:"Sadiku 8.47", q:R`Find $v_o(t)$ in Fig. 8.94 (the switch closes at $t=0$, shorting the 10 Ω).`,
 a:R`$t<0$: L short; 3 A splits between 5 Ω and (10 Ω + L): $i_L(0)=3\cdot\dfrac{5}{15}=1$ A, $v_o(0)=0$.<br>
 $t>0$: parallel 5 Ω, 1 H, 10 mF: $\alpha=\dfrac{1}{2(5)(0.01)}=10=\omega_0$ ⇒ critically damped, final $v_o=0$.<br>
 $C\,dv_o/dt(0)=3-0-1=2$ ⇒ $dv_o/dt=200$. $v_o=(A+Bt)e^{-10t}$ with $A=0$, $B=200$:<br>
 $v_o=\mathbf{200te^{-10t}\ V}$.`},
{pid:"c8:12", src:"Sadiku 8.49", q:R`Determine $i(t)$ for $t>0$ in Fig. 8.96 (the switch opens at $t=0$).`,
 a:R`$t<0$: L short: $i(0)=12/4+3=6$ A, $v_C(0)=0$.<br>
 $t>0$: parallel 5 Ω, 5 H, 1/20 F with 3 A: $\alpha=\dfrac1{2(5)(0.05)}=2=\omega_0$ ⇒ critically damped, $i(\infty)=3$ A.<br>
 $i=3+(A+Bt)e^{-2t}$, $A=3$, $i'(0)=v(0)/L=0$ ⇒ $B=6$. $i=\mathbf{3+(3+6t)e^{-2t}\ A}$.`},
];
