// Full past papers: every question of every paper, in order, with a complete worked answer.
// Most answers live in practice.js (pid "pp:N" / "fpp:N"); the phasor questions that are not in the 2026 syllabus are written out here (pid "ph:N").
const PHASOR = [
{pid:"ph:0", src:"2016 Q7 (10 marks)", figs:["ph16_7"], q:R`Solve for $v_o(t)$ in the circuit of Figure 7 (sources $12\cos3t$ V, $4\sin2t$ A and 10 V dc; $v_o$ is the capacitor voltage).`,
 a:R`Three sources at three different frequencies ⇒ <b>superposition is compulsory</b> (phasors only add at one frequency). Call the capacitor node A.<br>
 <b>DC (10 V on):</b> C open, 2 H short ⇒ A is tied straight to the 10 V source: $v_{o1}=10$ V.<br>
 <b>ω = 3 (12 cos 3t on, others off):</b> $Z_C=\dfrac{1}{j3/12}=-j4$, $Z_L=j6$ (inductor now to ground through the shorted 10 V source).<br>
 KCL at A: $\dfrac{12-V}{6}=\dfrac{V}{-j4}+\dfrac{V}{j6}$ ⇒ $V\left(\tfrac16+j\tfrac1{12}\right)=2$ ⇒ $V=9.6-j4.8=10.73\angle-26.57^\circ$.<br>
 <b>ω = 2 (4 sin 2t on):</b> $Z_C=-j6$, $Z_L=j4$; sources off: 6 Ω to ground. $Y=\tfrac16+j\tfrac16-j\tfrac14=\tfrac16-j\tfrac1{12}$.<br>
 $V=\dfrac{4\angle0^\circ}{0.1863\angle-26.57^\circ}=21.47\angle26.57^\circ$ (sine reference).<br>
 $$v_o(t)=\mathbf{10+10.73\cos(3t-26.57^\circ)+21.47\sin(2t+26.57^\circ)\ V}$$`},
{pid:"ph:1", src:"2016 Q8 (10 marks)", figs:["ph16_8"], q:R`In the circuit of Figure 8, find $i_o(t)$ using mesh analysis ($5\sin1000t$ A source).`,
 a:R`ω = 1000: $Z_C=\dfrac{1}{j(1000)(50\mu)}=-j20\,\Omega$, $Z_L=j(1000)(10\text{m})=j10\,\Omega$. Use sine as the phase reference, so $I_s=5\angle0^\circ$.<br>
 Mesh 1 holds only the current source: $I_1=5$. Mesh 2 (30 Ω, 10 Ω, C) and mesh 3 (C, 10 Ω, L), all clockwise; $i_o=I_3$.<br>
 Mesh 2: $30(I_2-5)+10I_2-j20(I_2-I_3)=0$ ⇒ $(40-j20)I_2+j20I_3=150$<br>
 Mesh 3: $-j20(I_3-I_2)+(10+j10)I_3=0$ ⇒ $j20I_2+(10-j10)I_3=0$<br>
 Solving: $I_2=2.5$ A, $I_3=2.5-j2.5=3.536\angle-45^\circ$ A.<br>
 $i_o(t)=\mathbf{3.536\sin(1000t-45^\circ)\ A}$.`},
{pid:"ph:2", src:"2016 Q9 (5 marks)", figs:["ph16_9"], q:R`Design the circuit in Figure 9 so that it is a high-pass filter with corner frequency $f_c=4$ kHz.`,
 a:R`Inverting amplifier with input impedance $R_i+\dfrac{1}{j\omega C_i}$:<br>
 $H(j\omega)=-\dfrac{R_f}{R_i+1/(j\omega C_i)}=-\dfrac{R_f}{R_i}\cdot\dfrac{j\omega R_iC_i}{1+j\omega R_iC_i}$ — zero at dc, $-R_f/R_i$ at high frequency: a high-pass.<br>
 Corner: $\omega_c=\dfrac1{R_iC_i}$ ⇒ $f_c=\dfrac{1}{2\pi R_iC_i}=4$ kHz.<br>
 Pick $C_i=10$ nF ⇒ $R_i=\dfrac{1}{2\pi(4000)(10^{-8})}=\mathbf{3.98\,k\Omega}$. $R_f$ sets the pass-band gain: e.g. $R_f=R_i=3.98$ kΩ for $|H|=1$ (any choice with the same $R_iC_i$ is correct).`},
{pid:"ph:3", src:"2017 Q8 (15 marks)", figs:["ph17_8"], q:R`Find the Thévenin equivalent with respect to terminals a, b for the circuit in Figure 7 ($120\angle0^\circ$ V, 12 Ω, 60 Ω, $-j40\,\Omega$, 120 Ω, VCVS $10V_x$).`,
 a:R`Node X = top of the 60 Ω ($V_x$). The VCVS fixes the node above it at $10V_x$; the 120 Ω joins that node to a; $-j40$ joins X to a.<br>
 <b>Open circuit</b> — KCL at X and at a:<br>
 $\dfrac{120-V_x}{12}=\dfrac{V_x}{60}+\dfrac{V_x-V_a}{-j40}$, &nbsp; $\dfrac{V_x-V_a}{-j40}+\dfrac{10V_x-V_a}{120}=0$<br>
 ⇒ $V_x=208+j144$, $V_{Th}=V_a=\mathbf{784-j288=835.2\angle-20.17^\circ\ V}$.<br>
 <b>Short circuit</b> ($V_a=0$): $\dfrac{120-V_x}{12}=\dfrac{V_x}{60}+\dfrac{V_x}{-j40}$ ⇒ $V_x=94.12-j23.53$.<br>
 $I_{sc}=\dfrac{V_x}{-j40}+\dfrac{10V_x}{120}=8.43+j0.39$ A.<br>
 $Z_{Th}=\dfrac{V_{Th}}{I_{sc}}=\mathbf{91.2-j38.4\ \Omega}$ (a resistor in series with a capacitor at this frequency).`},
{pid:"ph:4", src:"2018 Q5 (13 marks)", figs:["ph18_5"], q:R`(a) Design the series RLC band-pass filter of Figure 5(a) with cutoffs 20.1 kHz and 20.3 kHz, $R=20$ kΩ: find $L$, $C$, the resonant frequency and the bandwidth. (b) Find the resonant frequency of Figure 5(b).`,
 a:R`(a) Bandwidth $B=\omega_2-\omega_1=2\pi(200)=\mathbf{1256.6\,rad/s}$ (200 Hz). For a series RLC $B=R/L$ ⇒ $L=\dfrac{20\,000}{1256.6}=\mathbf{15.92\,H}$.<br>
 $\omega_0=\sqrt{\omega_1\omega_2}$ ⇒ $f_0=\sqrt{20.1\times20.3}$ kHz $=\mathbf{20.2\,kHz}$ ($\omega_0=1.269\times10^5$ rad/s).<br>
 $C=\dfrac1{\omega_0^2L}=\mathbf{3.90\,pF}$.<br>
 (b) Resonance = input impedance purely real. $Z=j\omega L+\dfrac{R}{1+j\omega RC}$; setting $\operatorname{Im}Z=0$:<br>
 $\omega L=\dfrac{\omega R^2C}{1+\omega^2R^2C^2}$ ⇒ $\omega^2=\dfrac1{LC}-\dfrac1{R^2C^2}=20\,000-10\,000$ ⇒ $\omega_0=\mathbf{100\,rad/s}$ (15.9 Hz).`},
{pid:"ph:5", src:"2018 Q8 (17 marks)", figs:["ph18_8"], q:R`Find the Thévenin equivalent at a, b for Figure 8, the load impedance for maximum average power, and that maximum power.`,
 a:R`Let P be the left node: $Z_1=4-j2$ from P to b, $Z_2=8+j4$ from P to a ($V_o=V_P-V_a$ across it), $20\angle0^\circ$ A from P to a, and $0.2V_o$ from b up into a.<br>
 <b>Open circuit</b> — KCL at a: $\dfrac{V_o}{Z_2}+20+0.2V_o=0$ ⇒ $V_o=\dfrac{-20}{1/Z_2+0.2}=-64.86-j10.81$.<br>
 KCL at P: $\dfrac{V_P}{Z_1}+\dfrac{V_o}{Z_2}+20=0$ ⇒ $V_P=-56.22+j17.30$.<br>
 $V_{Th}=V_P-V_o=\mathbf{8.65+j28.11=29.41\angle72.9^\circ\ V}$.<br>
 <b>$Z_{Th}$</b>: kill the 20 A, inject 1 A into a; solving the same two KCL equations gives $V_a=4.43-j0.59$ ⇒ $Z_{Th}=\mathbf{4.43-j0.59\ \Omega}$.<br>
 Maximum average power needs $Z_L=Z_{Th}^*=\mathbf{4.43+j0.59\ \Omega}$, and<br>
 $P_{max}=\dfrac{|V_{Th}|^2}{8R_{Th}}=\dfrac{29.41^2}{8(4.43)}=\mathbf{24.4\ W}$ (phasors are peak values).`},
];

const PAPERFULL = [
 {name:"Final Dec 2016", info:"15 Dec 2016 · 3 hours · answer all 11 questions (100 marks)", qs:[
   ["Q1","pp:0"],["Q2","pp:1"],["Q3","pp:2"],["Q4","fpp:0"],["Q5","fpp:1"],["Q6","fpp:2"],["Q7","ph:0"],["Q8","ph:1"],["Q9","ph:2"],["Q10","fpp:3"],["Q11","fpp:4"]]},
 {name:"Final Dec 2017", info:"19 Dec 2017 · 3 hours · answer all 9 questions (100 marks)", qs:[
   ["Q1","pp:3"],["Q2","pp:4"],["Q3","pp:5"],["Q4","fpp:5"],["Q5","fpp:6"],["Q6","fpp:7"],["Q7","fpp:8"],["Q8","ph:3"],["Q9","fpp:9"]]},
 {name:"Final Dec 2018", info:"17 Dec 2018 · 3 hours · answer all 8 questions (100 marks)", qs:[
   ["Q1","pp:6"],["Q2","pp:7"],["Q3","fpp:10"],["Q4","fpp:11"],["Q5","ph:4"],["Q6","fpp:12"],["Q7","fpp:13"],["Q8","ph:5"]]},
 {name:"Final Dec 2019", info:"10 Dec 2019 · 3 hours · answer all 10 questions (100 marks)", qs:[
   ["Q1","pp:8"],["Q2","pp:9"],["Q3","pp:10"],["Q4","pp:11"],["Q5","pp:12"],["Q6","fpp:14"],["Q7","fpp:15"],["Q8","fpp:16"],["Q9","fpp:17"],["Q10","fpp:18"]]},
 {name:"Final Dec 2020 (online, open book)", info:"18 Dec 2020 · 3 hours · Section A all (20 marks) + any four of Section B (80 marks)", qs:[
   ["A1","pp:13"],["A2","pp:14"],["A3","pp:15"],["A4","fpp:19"],["B1","fpp:20"],["B2","fpp:21"],["B3","fpp:22"],["B4","pp:16"],["B5","pp:17"]]},
];
