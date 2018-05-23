---
layout: post
title: Educational Codeforces Round 44解题报告
category: blog
description: DEFG个人解题报告
---
贪心一下，画画图就好了
## D.Sand Fortress

```
#include <bits/stdc++.h>
typedef long long ll;
ll n, H, ans = 0x7f7f7f7f7f7f7f7f;
bool check(ll h) {
    ll need, ret;
    if (h > H) {
        need = ll(1.0 * (h + H) * (h - H + 1) / 2 + 1.0 * (h + 1) * h / 2 - h);
        ret = h - H + h;
    }
    else {
        need = ll(1.0 * (h + 1) * h / 2);
        ret = h;
    }
    if (need > n) return false;
    ll last = n - need;
    ret += last / h + (last % h > 0);
    if (ret <= ans) {
        ans = ret;
        return true;
    }
    return false;
}
int main() {
    std::cin >> n >> H;
    ll l = 1, r = int(2e9) + 7, mid;
    while (l <= r) {
        mid = l + r >> 1;
        if (check(mid)) l = mid + 1;
        else r = mid - 1;
    }
    printf("%lld\n", ans);
    return 0;
}
```

## E.Pencils and Boxes
先预处理出每一个$a_i$最远能到的$a_j$记right[i] = j+1,，对于dp[i] 判断 dp[i+1 ……  right[i]] 是否存在至少一个1。存在dp[i]即为合理位置，最后看dp[1]是否合理
```
/*
 * Author:  JiangYu
 * Created Time:  2018/5/23 22:37:40
 * File Name: F.cpp
 */
#include <iostream>
#include <cstdio>
#include <cstdlib>
#include <cstring>
#include <cmath>
#include <algorithm>
#include <string>
#include <vector>
#include <stack>
#include <queue>
#include <set>
#include <map>
#include <time.h>
using namespace std;
#define ll long long
#define MP make_pair
#define PB push_back
#define X first
#define Y second
#define FI first
#define SE second
#define inf 0x3f3f3f3f
#define FOR(i,a,b) for(int i = a; i <= b; ++i)
#define FORD(i,a,b) for(int i = b; i >= a; --i)
#define ALL(x) x.begin(),x.end()
#define REP(i,a) for(int i = 0; i < a; ++i)
#define DEP(i,a) for(int i = a-1; i >= 0; --i)
#define CLR(a) memset(a, 0, sizeof a)
const int N  = 5e5 + 100;
int n, k, d;
int a[N];
int bit[N], Right[N];
int lowbit(int k) {
    return k & -k;
}
void add(int x, int y) {
    while(x < N) {
        bit[x] += y;
        x += lowbit(x);
    }
}
int sum(int x) {
    int res = 0;
    while(x) {
        res += bit[x];
        x -= lowbit(x);
    }
    return res;
}
void cal(int pos) {
    if(Right[pos] != 0) return ;
    int l = pos, r = n + 1, m;
    while(l  <= r) {
        m = l + r >>1;
        if(a[m] <= a[pos] + d) l = m + 1 ;
        else r = m - 1;
    }
    Right[pos] = r + 1;
    
}
int main() {
    scanf("%d%d%d", &n, &k, &d);
    for(int i = 1; i <= n; ++i) {
        scanf("%d", &a[i]);
    }
    sort(a+1, a+1+n);
    add(n+1, 1);
    for(int i = 1; i <= n; ++i) 
        cal(i);
    for(int i = n; i >= 1; --i) {
        if(i + k - 1 <= n) {
            int state = sum(Right[i]) - sum(i + k - 1) > 0;
            add(i, state);
        }
    }
    if(sum(1) == 1) puts("YES");
    else puts("NO");
    
    return 0;
}

```
## F.Isomorphic Strings
按位置来给字母hash，两个子串里，不同字母如果在相同位置，则hash值相同。然后排序，相同则为同构。
```
/*
 * Author:  JiangYu
 * Created Time:  2018/5/23 23:11:56
 * File Name: F.cpp
 */
#include <iostream>
#include <cstdio>
#include <cstdlib>
#include <cstring>
#include <cmath>
#include <algorithm>
#include <string>
#include <vector>
#include <stack>
#include <queue>
#include <set>
#include <map>
#include <time.h>
using namespace std;
#define ll long long
#define MP make_pair
#define PB push_back
#define X first
#define Y second
#define FI first
#define SE second
#define inf 0x3f3f3f3f
#define FOR(i,a,b) for(int i = a; i <= b; ++i)
#define FORD(i,a,b) for(int i = b; i >= a; --i)
#define ALL(x) x.begin(),x.end()
#define REP(i,a) for(int i = 0; i < a; ++i)
#define DEP(i,a) for(int i = a-1; i >= 0; --i)
#define CLR(a) memset(a, 0, sizeof a)
const int MOD = 1e9 + 7;
const int base = 233;
const int N = 2e5 + 10;
char s[N];
ll Hash[N][30];
ll p[N], a[30], b[30];
ll get(int l, int r, int i) {
    return ((Hash[r][i] - Hash[l-1][i]*p[r - l + 1]) % MOD + MOD ) % MOD;
}
bool judge(int x, int y, int len) {
    for(int i = 0; i < 26; ++i) {
        a[i] = get(x, x + len - 1, i);
        b[i] = get(y, y + len - 1, i);
    }
    sort(a, a+26);
    sort(b, b+26);
    for(int i = 0; i < 26; ++i) {
        if(a[i] != b[i]) return 0;
    }
    return 1;
}
int main() {
    int n, m, x, y, len;
    scanf("%d%d", &n, &m);
    scanf("%s", s+1);
    p[0] = 1;
    for(int i = 1; i <= n; ++i) {
        p[i] = p[i-1] * base % MOD;
        for(int j = 0; j < 26; ++j) {
            Hash[i][j] = (Hash[i-1][j] * base + (s[i] == 'a' + j)) % MOD;
        }
    }
    while(m--) {
        scanf("%d%d%d", &x, &y, &len);
        if(judge(x, y, len)) puts("YES");
        else puts("NO");
    }
    return 0;
    
}

```
## G.Team Players