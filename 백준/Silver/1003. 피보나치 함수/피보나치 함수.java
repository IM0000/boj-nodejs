import java.io.*;

public class Main {
	static int[] zeroN = new int[41];
	static int[] oneN = new int[41];
	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		int T = Integer.parseInt(br.readLine());
		StringBuilder sb = new StringBuilder();
		
		zeroN[0] = 1;
		zeroN[1] = 0;
		oneN[0] = 0;
		oneN[1] = 1;
		for(int i = 2; i<41; i++) {
			zeroN[i] = zeroN[i-1] + zeroN[i-2];
			oneN[i] = oneN[i-1] + oneN[i-2];
		}
		
		for(int i =0; i<T; i++) {
			int N = Integer.parseInt(br.readLine());
			sb.append(zeroN[N]).append(" ").append(oneN[N]).append("\n");
		}
		
		System.out.print(sb);
	}
}